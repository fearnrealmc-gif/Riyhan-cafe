'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2, Upload, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { supabase } from '@/lib/supabase/client';

interface BannerSettings {
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  image_url: string;
}

const compressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.75): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas to Blob conversion failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<BannerSettings>({
    title: '',
    description: '',
    button_text: '',
    button_link: '',
    image_url: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'promo_banner')
          .single();

        if (error) {
          console.log("No settings found, using defaults.");
        } else if (data?.value) {
          const bannerData = data.value as BannerSettings;
          setSettings(bannerData);
          setImagePreview(bannerData.image_url || '');
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً! الحد الأقصى هو 5 ميجابايت.');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    let finalImageUrl = settings.image_url;

    try {
      if (imageFile) {
        const compressedBlob = await compressImage(imageFile);
        const fileExt = 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, compressedBlob, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
            upsert: true
          });

        if (uploadError) {
          throw new Error('فشل رفع الصورة إلى التخزين: ' + (uploadError.message || JSON.stringify(uploadError)));
        }

        const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      } else if (imagePreview === '') {
        finalImageUrl = '';
      }

      const updatedSettings = {
        ...settings,
        image_url: finalImageUrl
      };

      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'promo_banner',
          value: updatedSettings,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });

      if (error) throw error;

      setSettings(updatedSettings);
      setImageFile(null);
      setMessage({ type: 'success', text: 'تم حفظ وتحديث إعدادات البنر بنجاح!' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      console.error("Error saving settings:", err);
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ: ' + (err.message || 'فشل الاتصال بقاعدة البيانات') });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6" dir="rtl">
      <div>
        <h1 className="text-xl font-bold text-offwhite font-arabic">إعدادات بنر الميزات</h1>
        <p className="text-sm text-offwhite/40 mt-0.5 font-arabic">
          تعديل وتخصيص محتوى البنر الترويجي الذي يظهر تحت فلاتر الأصناف في الصفحة الرئيسية.
        </p>
      </div>

      {message && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm animate-fade-in ${message.type === 'success'
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
            : 'border-red-500/30 bg-red-500/10 text-red-400'
            }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span className="font-arabic">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-olive-light/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 space-y-6">
        <div className="space-y-5">
          <Input
            label="العنوان الرئيسي للبنر"
            placeholder="مثال: أجواء مميزة وجلسات فريدة"
            value={settings.title}
            onChange={(e) => setSettings({ ...settings, title: e.target.value })}
            required
            className="bg-black/20 border-white/10 text-offwhite focus:border-gold"
          />

          <div>
            <label className="block text-sm font-medium text-offwhite/80 mb-1.5 font-arabic">
              الوصف / تفاصيل البنر
            </label>
            <textarea
              placeholder="اكتب وصفاً جذاباً للخدمة أو العرض..."
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/20 text-offwhite placeholder:text-warm-gray text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold hover:border-white/20 resize-none font-arabic"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="نص الزر"
              placeholder="مثال: احجز طاولتك الآن"
              value={settings.button_text}
              onChange={(e) => setSettings({ ...settings, button_text: e.target.value })}
              required
              className="bg-black/20 border-white/10 text-offwhite focus:border-gold"
            />

            <Input
              label="رابط الزر (رابط الواتساب أو صفحة)"
              placeholder="مثال: https://wa.me/963984858449"
              value={settings.button_link}
              onChange={(e) => setSettings({ ...settings, button_link: e.target.value })}
              required
              className="bg-black/20 border-white/10 text-offwhite focus:border-gold text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-offwhite/80 mb-1.5 font-arabic">
              صورة البنر (أقصى حجم 5 ميجابايت)
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-black/20">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                      setSettings(prev => ({ ...prev, image_url: '' }));
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-black/95 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-20 rounded-xl bg-black/25 border-2 border-dashed border-white/10 flex items-center justify-center text-warm-gray text-xs shrink-0 font-arabic">
                  لا توجد صورة
                </div>
              )}
              <label className="flex-1">
                <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-offwhite hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer w-full text-center font-arabic">
                  <Upload size={16} className="text-gold animate-bounce" />
                  اختر صورة للبنر
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button
            type="submit"
            variant="primary"
            className="rounded-xl px-6 py-2.5 gap-2 font-bold cursor-pointer font-arabic"
            isLoading={isSaving}
          >
            <Save size={16} />
            حفظ التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
}
