'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Bell, Shield, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { createBrowserClient } from '@/lib/supabase/browser-client';
import { LoadingSpinner } from '@/components/ui/Loading';
import { uploadAvatar } from '@/lib/supabase/storage';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    avatarUrl: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        setProfile({
          fullName: user.user_metadata?.full_name || '',
          email: user.email || '',
          avatarUrl: user.user_metadata?.avatar_url || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploadingAvatar(true);
    try {
      const avatarUrl = await uploadAvatar(file, userId);

      const supabase = createBrowserClient();
      const { error } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl },
      });

      if (error) throw error;

      setProfile({ ...profile, avatarUrl });
      toast.success('Avatar updated successfully!');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.updateUser({
        data: { full_name: profile.fullName },
      });

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setSaving(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;

      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Settings</h1>
        <p className="text-[#5D4037]">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#2C1810] text-white'
                        : 'text-[#5D4037] hover:bg-[#F5F0E8]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardBody>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-[#2C1810] mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                      Avatar
                    </label>
                    <div className="flex items-center gap-4">
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-[#8D6E63] flex items-center justify-center text-white text-2xl font-semibold">
                          {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                          id="avatar-upload"
                          disabled={uploadingAvatar}
                        />
                        <label
                          htmlFor="avatar-upload"
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg transition-all border border-[#D7CCC8] text-[#2C1810] hover:bg-[#F5F0E8] cursor-pointer ${
                            uploadingAvatar ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {uploadingAvatar ? 'Uploading...' : 'Change Avatar'}
                        </label>
                        <p className="text-xs text-[#8D6E63] mt-1">
                          JPG, PNG or GIF (max 2MB)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-[#2C1810] mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', description: 'Receive email updates about your schedules' },
                    { label: 'Event Reminders', description: 'Get notified before events start' },
                    { label: 'Weekly Summary', description: 'Receive weekly schedule summary' },
                    { label: 'Marketing Emails', description: 'Receive updates about new features' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-[#D7CCC8]">
                      <div>
                        <h3 className="font-medium text-[#2C1810]">{item.label}</h3>
                        <p className="text-sm text-[#8D6E63]">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                        <div className="w-11 h-6 bg-[#D7CCC8] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#8D6E63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2C1810]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-[#2C1810] mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-[#2C1810] mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <Input
                        label="Current Password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                      />
                      <Input
                        label="New Password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="At least 6 characters"
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                      />
                      <Button variant="primary" onClick={handleChangePassword} disabled={saving}>
                        {saving ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#E8DFD5]">
                    <h3 className="font-medium text-[#2C1810] mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-[#8D6E63] mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {activeTab === 'subscription' && (
            <Card>
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-[#2C1810] mb-6">Subscription Plan</h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-lg bg-[#F5F0E8] border border-[#D7CCC8]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#2C1810]">Free Plan</h3>
                        <p className="text-[#8D6E63]">Current plan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#2C1810]">$0</p>
                        <p className="text-sm text-[#8D6E63]">per month</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-[#5D4037]">
                        <span className="text-[#2E7D32]">✓</span> 3 schedules
                      </li>
                      <li className="flex items-center gap-2 text-[#5D4037]">
                        <span className="text-[#2E7D32]">✓</span> Basic AI extraction
                      </li>
                      <li className="flex items-center gap-2 text-[#5D4037]">
                        <span className="text-[#2E7D32]">✓</span> Calendar view
                      </li>
                    </ul>
                    <Button variant="primary" className="w-full">
                      Upgrade to Pro
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-[#D7CCC8]">
                      <h4 className="font-semibold text-[#2C1810] mb-2">Pro Plan</h4>
                      <p className="text-2xl font-bold text-[#2C1810] mb-2">$9/mo</p>
                      <ul className="space-y-1 text-sm text-[#5D4037]">
                        <li>• Unlimited schedules</li>
                        <li>• Advanced AI features</li>
                        <li>• Analytics dashboard</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border border-[#D7CCC8]">
                      <h4 className="font-semibold text-[#2C1810] mb-2">Enterprise</h4>
                      <p className="text-2xl font-bold text-[#2C1810] mb-2">$29/mo</p>
                      <ul className="space-y-1 text-sm text-[#5D4037]">
                        <li>• Everything in Pro</li>
                        <li>• Team collaboration</li>
                        <li>• Priority support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
