import React, { useEffect, useState } from 'react';
import { FileText, RefreshCw, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../Services/api';

const STATUS_OPTIONS = ['Received','Under Review','Shortlisted','Rejected','Hired'];

const STATUS_COLORS = {
  Received:      { bg: 'rgba(37,99,235,0.08)',   text: '#2563eb' },
  'Under Review':{ bg: 'rgba(245,158,11,0.1)',   text: '#d97706' },
  Shortlisted:   { bg: 'rgba(139,92,246,0.1)',   text: '#7c3aed' },
  Rejected:      { bg: 'rgba(239,68,68,0.08)',   text: '#dc2626' },
  Hired:         { bg: 'rgba(34,197,94,0.08)',   text: '#16a34a' },
};

const card = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
  borderRadius: '1rem',
};

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState('');
  const [expanded, setExpanded]         = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/applications');
      setApplications(data.applications || []);
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch { /* ignore */ }
  };

  const filtered = applications.filter(a =>
    !search ||
    a.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase()) ||
    a.position?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary-900">Applications</h1>
          <p className="text-sm text-secondary-500">{applications.length} total submissions</p>
        </div>
        <button onClick={load} className="btn btn-ghost gap-2 text-secondary-500">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, position…"
          className="input pl-10 text-sm" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={card}>
        {loading ? (
          <div className="flex items-center justify-center py-20 text-secondary-400">
            <span className="w-6 h-6 border-2 border-slate-200 border-t-primary rounded-full animate-spin mr-3" />
            Loading applications…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-secondary-400">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p>{search ? 'No matching applications' : 'No applications yet'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(248,250,252,0.8)', borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
                  {['Applicant','Position','Experience','Date','Status','Action',''].map((h, i) => (
                    <th key={i} className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <React.Fragment key={a._id}>
                    <tr
                      style={{ borderBottom: '1px solid rgba(226,232,240,0.5)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.02)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-secondary-900">{a.fullName}</p>
                        <p className="text-xs text-secondary-500">{a.email}</p>
                        {a.phone && <p className="text-xs text-secondary-400">📞 {a.phone}</p>}
                      </td>
                      <td className="px-4 py-3 font-medium text-secondary-700">{a.position}</td>
                      <td className="px-4 py-3 text-secondary-600 text-xs">{a.experience}</td>
                      <td className="px-4 py-3 text-xs text-secondary-500">
                        {new Date(a.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{ background: STATUS_COLORS[a.status]?.bg, color: STATUS_COLORS[a.status]?.text }}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select value={a.status}
                          onChange={e => updateStatus(a._id, e.target.value)}
                          className="input text-xs py-1 px-2 w-auto min-w-[130px]">
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setExpanded(expanded === a._id ? null : a._id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-secondary-400 hover:text-primary transition-all"
                          style={{ background: 'rgba(248,250,252,0.8)' }}>
                          {expanded === a._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </td>
                    </tr>
                    {/* Expanded detail row */}
                    {expanded === a._id && (
                      <tr style={{ background: 'rgba(248,250,252,0.7)', borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
                        <td colSpan={7} className="px-6 py-4">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                            {a.location      && <div><span className="text-secondary-400 font-medium">Location</span><p className="text-secondary-700 mt-0.5">{a.location}</p></div>}
                            {a.expectedSalary&& <div><span className="text-secondary-400 font-medium">Expected Salary</span><p className="text-secondary-700 mt-0.5">{a.expectedSalary}</p></div>}
                            {a.noticePeriod  && <div><span className="text-secondary-400 font-medium">Notice Period</span><p className="text-secondary-700 mt-0.5">{a.noticePeriod}</p></div>}
                            {a.availableDate && <div><span className="text-secondary-400 font-medium">Available From</span><p className="text-secondary-700 mt-0.5">{new Date(a.availableDate).toLocaleDateString('en-IN')}</p></div>}
                            {a.skills        && <div><span className="text-secondary-400 font-medium">Skills</span><p className="text-secondary-700 mt-0.5">{a.skills}</p></div>}
                            {a.linkedIn      && <div><span className="text-secondary-400 font-medium">LinkedIn</span><a href={a.linkedIn} target="_blank" rel="noreferrer" className="text-primary hover:underline mt-0.5 block truncate">{a.linkedIn}</a></div>}
                            {a.portfolio     && <div><span className="text-secondary-400 font-medium">Portfolio</span><a href={a.portfolio} target="_blank" rel="noreferrer" className="text-primary hover:underline mt-0.5 block truncate">{a.portfolio}</a></div>}
                            {a.resumeFileName&& <div><span className="text-secondary-400 font-medium">Resume File</span><p className="text-secondary-700 mt-0.5">{a.resumeFileName}</p></div>}
                          </div>
                          {a.coverLetter && (
                            <div className="mt-3">
                              <p className="text-xs text-secondary-400 font-medium mb-1">Cover Letter</p>
                              <p className="text-sm text-secondary-700 leading-relaxed bg-white/70 rounded-xl p-3">{a.coverLetter}</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 text-xs text-secondary-400" style={{ borderTop: '1px solid rgba(226,232,240,0.5)' }}>
            Showing {filtered.length} of {applications.length} applications · Click ▾ to expand details
          </div>
        )}
      </div>
    </div>
  );
}
