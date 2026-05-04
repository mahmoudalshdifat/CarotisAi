// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – About Page
// ──────────────────────────────────────────────────────────────────────────────

import { Activity, Heart, BookOpen, Shield, Stethoscope, Users } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { Card, Badge } from '../components/UI';

const VERSION = '1.0.0';

function FeatureCard({ icon: Icon, title, desc, color }: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="flex gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-200">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useApp();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100">{t('appName')}</h1>
        <p className="text-sky-400 mt-1">{t('appTagline')}</p>
        <div className="flex justify-center gap-2 mt-3">
          <Badge variant="info">{t('about_version')} {VERSION}</Badge>
          <Badge variant="muted">Research Tool</Badge>
        </div>
      </div>

      {/* About */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h2 className="font-medium text-slate-200">{t('about_title')}</h2>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{t('about_body')}</p>
        <p className="text-xs text-slate-600 mt-3">{t('about_tech')}</p>
      </Card>

      {/* Features */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Features</h2>
        <div className="space-y-2">
          <FeatureCard
            icon={Stethoscope}
            title="AI-Powered Analysis"
            desc="Uses Google Gemini's multimodal AI to analyse carotid ultrasound images for stenosis, plaque, and IMT assessment."
            color="bg-sky-700"
          />
          <FeatureCard
            icon={Shield}
            title="Privacy First"
            desc="Your API key and analysis data stay in your browser. No data is sent to external servers beyond Google Gemini."
            color="bg-emerald-700"
          />
          <FeatureCard
            icon={Heart}
            title="Structured Reports"
            desc="Generates downloadable PDF reports following radiology reporting conventions."
            color="bg-rose-700"
          />
          <FeatureCard
            icon={Users}
            title="Multi-language Support"
            desc="Available in English, German, and Arabic to support international research collaboration."
            color="bg-purple-700"
          />
        </div>
      </div>

      {/* Medical disclaimer */}
      <Card className="bg-red-950/20 border-red-900/40">
        <h2 className="font-semibold text-red-300 mb-2">{t('disclaimer_title')}</h2>
        <p className="text-xs text-red-200/70 leading-relaxed">{t('disclaimer_body')}</p>
      </Card>

      {/* Context */}
      <Card>
        <h2 className="font-medium text-slate-200 mb-2">Research Context</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          CarotisAi was developed to support radiology research and doctoral education, 
          enabling researchers to explore AI-assisted carotid artery analysis workflows. 
          It is designed for use by radiologists-in-training and research physicians.
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Carotid artery ultrasound assessment is a key tool in cardiovascular risk stratification, 
          particularly for the detection of atherosclerotic plaques, stenosis grading (NASCET/ECST criteria), 
          and intima-media thickness measurement.
        </p>
      </Card>
    </div>
  );
}
