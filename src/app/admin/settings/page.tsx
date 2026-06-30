'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<BannerSettings>({
    title: '',
    description: '',
    button_text: '',
    button_link: '',
    image_url: '',
  });
  
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
          setSettings(data.value as BannerSettings);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      // Upsert settings in the database
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'promo_banner',
          value: settings,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });

      if (error) throw error;

      setMessage({ type: 'success', text: 'تم حفظ إعدادات البنر بنجاح!' });
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
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm animate-fade-in ${
            message.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-red-500/30 bg-red-500/10 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span className="font-arabic">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-olive-light/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 space-y-6">
        <div className="space-y-4">
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
              placeholder="مثال: https://wa.me/963999999999"
              value={settings.button_link}
              onChange={(e) => setSettings({ ...settings, button_link: e.target.value })}
              required
              className="bg-black/20 border-white/10 text-offwhite focus:border-gold text-left"
              dir="ltr"
            />
          </div>

          <Input
            label="رابط صورة البنر"
            placeholder="مثال: /waffle.png أو رابط صورة خارجي"
            value={settings.image_url}
            onChange={(e) => setSettings({ ...settings, image_url: e.target.value })}
            required
            className="bg-black/20 border-white/10 text-offwhite focus:border-gold text-left"
            dir="ltr"
          />

          {settings.image_url && (
            <div className="space-y-2">
              <span className="block text-xs font-medium text-offwhite/40 font-arabic">معاينة الصورة:</span>
              <div className="w-full h-40 rounded-xl overflow-hidden border border-white/10 relative">
                <img
                  src={settings.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=600';
                  }}
                />
              </div>
            </div>
          )}
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
