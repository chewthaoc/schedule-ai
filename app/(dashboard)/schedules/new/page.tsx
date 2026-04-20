'use client';

import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Upload, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NewSchedulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'school',
    color: '#8D6E63',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (imageFile && imagePreview) {
        const response = await fetch('/api/ai/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrl: imagePreview }),
        });

        if (!response.ok) throw new Error('Failed to extract events');

        const { events } = await response.json();
        toast.success(`Extracted ${events.length} events successfully!`);
      }

      toast.success('Schedule created successfully!');
      router.push('/schedules');
    } catch (error) {
      toast.error('Failed to create schedule');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Create New Schedule</h1>
        <p className="text-[#5D4037]">Upload an image or create manually</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-[#2C1810] mb-4">Basic Information</h2>

            <div className="space-y-4">
              <Input
                label="Schedule Title"
                placeholder="e.g., Spring 2026 Timetable"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <Textarea
                label="Description"
                placeholder="Brief description of this schedule"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />

              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                  Schedule Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[#D7CCC8] bg-white text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option value="school">School</option>
                  <option value="work">Work</option>
                  <option value="event">Event</option>
                  <option value="personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                  Color Theme
                </label>
                <div className="flex gap-3">
                  {['#2E7D32', '#E65100', '#1565C0', '#7B1FA2', '#C62828', '#8D6E63'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        formData.color === color ? 'ring-2 ring-offset-2 ring-[#2C1810]' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-semibold text-[#2C1810] mb-4">Upload Schedule Image</h2>

            <div className="border-2 border-dashed border-[#D7CCC8] rounded-lg p-8 text-center hover:border-[#8D6E63] transition-all">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-96 mx-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-[#8D6E63]" />
                  <p className="text-[#2C1810] font-medium mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-[#8D6E63]">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              )}
            </div>
          </CardBody>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Schedule'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
