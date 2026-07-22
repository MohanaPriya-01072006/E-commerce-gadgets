import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, CheckCircle, AlertCircle, Briefcase,
  MapPin, Phone, Mail, Calendar, Upload, User,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../Services/api';

const glassCard = {
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: '1.5rem',
};

const POSITIONS = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'UI/UX Designer', 'Product Manager', 'Marketing Manager',
  'Customer Support', 'Operations Manager', 'Data Analyst', 'Content Writer',
];

const EMPTY = {
  fullName: '', email: '', phone: '', position: '', experience: '',
  location: '', skills: '', expectedSalary: '', noticePeriod: '',
  availableDate: '', linkedIn: '', portfolio: '', coverLetter: '',
  resume: null,
};

export default function Application() {
  const [formData, setFormData]     = useState(EMPTY);
  const [errors, setErrors]         = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim())    e.fullName    = 'Full name is required';
    if (!formData.email.trim())       e.email       = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email format';
    if (!formData.phone.trim())       e.phone       = 'Phone number is required';
    if (!formData.position)           e.position    = 'Position is required';
    if (!formData.experience)         e.experience  = 'Experience is required';
    if (!formData.location.trim())    e.location    = 'Location is required';
    if (!formData.availableDate)      e.availableDate = 'Available date is required';
    if (!formData.resume)             e.resume      = 'Resume is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fill all required fields'); return; }
    setIsSubmitting(true);
    try {
      await api.post('/applications', {
        fullName:       formData.fullName,
        email:          formData.email,
        phone:          formData.phone,
        position:       formData.position,
        experience:     formData.experience,
        location:       formData.location,
        skills:         formData.skills,
        expectedSalary: formData.expectedSalary,
        noticePeriod:   formData.noticePeriod,
        availableDate:  formData.availableDate,
        linkedIn:       formData.linkedIn,
        portfolio:      formData.portfolio,
        coverLetter:    formData.coverLetter,
        // Resume file name stored as text; full file upload can be added later
        resumeFileName: formData.resume?.name || '',
      });
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      setIsSubmitting(false);
      const msg = err?.response?.data?.message || 'Submission failed. Please try again.';
      toast.error(msg);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen py-16 flex items-center" style={{ background: 'transparent' }}>
        <div className="container-custom px-4 sm:px-6 max-w-2xl">
          <div className="p-12 text-center" style={glassCard}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <CheckCircle className="text-emerald-600" size={40} />
            </div>
            <h1 className="font-display font-black text-3xl text-secondary-900 mb-4">Application Submitted!</h1>
            <p className="text-secondary-600 text-lg mb-8">
              Thank you for your interest in joining Moprix. We've received your application and will review it shortly.
              If your profile matches our requirements, our HR team will contact you within 7–10 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                Return to Home
              </Link>
              <button onClick={() => { setSubmitted(false); setFormData(EMPTY); }} className="btn btn-outline">
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="min-h-screen py-16" style={{ background: 'transparent' }}>
      <div className="container-custom px-4 sm:px-6 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
            <Briefcase className="text-primary" size={32} />
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-secondary-900 mb-4">Join Our Team</h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Build the future of tech with us. We're looking for passionate individuals to join our growing team.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="p-8" style={glassCard}>
          <div className="grid md:grid-cols-2 gap-6">

            {/* ── Personal Information ── */}
            <div className="md:col-span-2">
              <h2 className="font-display font-bold text-xl text-secondary-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" /> Personal Information
              </h2>
            </div>

            <div>
              <label className="label">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`input pl-10 ${errors.fullName ? 'input-error' : ''}`} />
              </div>
              {errors.fullName && <p className="text-danger text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="label">Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`} />
              </div>
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="label">Phone Number *</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`input pl-10 ${errors.phone ? 'input-error' : ''}`} />
              </div>
              {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="label">Current Location *</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" name="location" value={formData.location} onChange={handleChange}
                  placeholder="City, State"
                  className={`input pl-10 ${errors.location ? 'input-error' : ''}`} />
              </div>
              {errors.location && <p className="text-danger text-xs mt-1">{errors.location}</p>}
            </div>

            {/* ── Professional Details ── */}
            <div className="md:col-span-2 mt-2">
              <h2 className="font-display font-bold text-xl text-secondary-900 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-primary" /> Professional Details
              </h2>
            </div>

            <div>
              <label className="label">Position Applied For *</label>
              <select name="position" value={formData.position} onChange={handleChange}
                className={`input ${errors.position ? 'input-error' : ''}`}>
                <option value="">Select a position</option>
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.position && <p className="text-danger text-xs mt-1">{errors.position}</p>}
            </div>

            <div>
              <label className="label">Years of Experience *</label>
              <select name="experience" value={formData.experience} onChange={handleChange}
                className={`input ${errors.experience ? 'input-error' : ''}`}>
                <option value="">Select experience</option>
                <option value="0-1">0–1 years (Fresher)</option>
                <option value="1-3">1–3 years</option>
                <option value="3-5">3–5 years</option>
                <option value="5-8">5–8 years</option>
                <option value="8+">8+ years</option>
              </select>
              {errors.experience && <p className="text-danger text-xs mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label className="label">Expected Salary (Annual)</label>
              <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange}
                placeholder="e.g., ₹8–12 LPA" className="input" />
            </div>

            <div>
              <label className="label">Notice Period</label>
              <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="input">
                <option value="">Select notice period</option>
                <option value="Immediate">Immediate</option>
                <option value="15 days">15 days</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </div>

            <div>
              <label className="label">Available to Join *</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="date" name="availableDate" value={formData.availableDate} onChange={handleChange}
                  className={`input pl-10 ${errors.availableDate ? 'input-error' : ''}`} />
              </div>
              {errors.availableDate && <p className="text-danger text-xs mt-1">{errors.availableDate}</p>}
            </div>

            <div>
              <label className="label">LinkedIn Profile</label>
              <input type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile" className="input" />
            </div>

            <div className="md:col-span-2">
              <label className="label">Key Skills</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                placeholder="e.g., React, Node.js, Python, UI Design" className="input" />
              <p className="text-xs text-secondary-400 mt-1">Separate skills with commas</p>
            </div>

            <div className="md:col-span-2">
              <label className="label">Portfolio Website</label>
              <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange}
                placeholder="https://yourportfolio.com" className="input" />
            </div>

            {/* ── Documents ── */}
            <div className="md:col-span-2 mt-2">
              <h2 className="font-display font-bold text-xl text-secondary-900 mb-4 flex items-center gap-2">
                <Upload size={20} className="text-primary" /> Documents
              </h2>
            </div>

            <div className="md:col-span-2">
              <label className="label">Resume / CV *</label>
              <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx"
                className={`input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:cursor-pointer hover:file:bg-primary/20 ${errors.resume ? 'input-error' : ''}`} />
              {errors.resume && <p className="text-danger text-xs mt-1">{errors.resume}</p>}
              <p className="text-xs text-secondary-400 mt-1">Accepted: PDF, DOC, DOCX (Max 5 MB)</p>
            </div>

            <div className="md:col-span-2">
              <label className="label">Cover Letter</label>
              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={5}
                placeholder="Tell us why you're interested in this role and what makes you a great fit…"
                className="input resize-none" />
            </div>

            {/* ── Submit ── */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-center justify-between mt-2">
              <p className="text-sm text-secondary-500">
                By submitting, you agree to our{' '}
                <Link to="/terms"   className="text-primary hover:underline">Terms</Link> &amp;{' '}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
              <button type="submit" disabled={isSubmitting}
                className="btn btn-lg min-w-[200px] text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
                {isSubmitting
                  ? <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </span>
                  : 'Submit Application'}
              </button>
            </div>
          </div>
        </form>

        {/* What happens next */}
        <div className="mt-8 p-6 rounded-2xl" style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}>
          <div className="flex items-start gap-4">
            <AlertCircle className="text-primary flex-shrink-0 mt-1" size={22} />
            <div>
              <h3 className="font-bold text-lg text-secondary-900 mb-2">What Happens Next?</h3>
              <ul className="space-y-1.5 text-secondary-600 text-sm">
                <li>• Our HR team reviews applications within 7–10 business days</li>
                <li>• Shortlisted candidates will be contacted for initial screening</li>
                <li>• Selected candidates go through technical and HR rounds</li>
                <li>• Final offers are extended within 2–3 weeks of completion</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
