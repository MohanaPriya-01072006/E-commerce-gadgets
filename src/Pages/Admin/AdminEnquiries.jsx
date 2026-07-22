import React, { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw, Search, X } from 'lucide-react';
import api from '../../Services/api';

const STATUS_COLORS = {
  New:         { bg: 'rgba(37,99,235,0.08)',  text: '#2563eb' },
  'In Progress':{ bg: 'rgba(245,158,11,0.1)',  text: '#d97706' },
  Resolved:    { bg: 'rgba(34,197,94,0.08)',  text: '#16a34a' },
};

const card = {
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
  borderRadius: '1rem',
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [expanded, setExpanded]   = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/enquiries');
      setEnquiries(data.enquiries || []);
    } catch {
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}/status`, { status });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e));
    } catch { /* ignore */ }
  };

  const filtered = enquiries.filter(e =>
    !search ||
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase()) ||
    e.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-secondary-900">Enquiries</h1>
          <p className="text-sm text-secondary-500">{enquiries.length} total submissions</p>
        </div>
        <button onClick={load} className="btn btn-ghost gap-2 text-secondary-500">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, subject…"
          className="input pl-10 text-sm" />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={card}>
        {loading ? (
          <div className="flex items-center justify-center py-20 text-secondary-400">
            <span className="w-6 h-6 border-2 border-slate-200 border-t-primary rounded-full animate-spin mr-3" />
            Loading enquiries…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-secondary-400">
            <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
            <p>{search ? 'No matching enquiries' : 'No enquiries yet'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(248,250,252,0.8)', borderBottom: '1px solid rgba(226,232,240,0.6)' }}>
                  {['Name','Email','Subject','Date','Status','Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-secondary-500 text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <React.Fragment key={e._id}>
                    <tr
                      style={{ borderBottom: '1px solid rgba(226,232,240,0.5)', cursor: 'pointer' }}
                      onMouseEnter={ev => ev.currentTarget.style.background = 'rgba(37,99,235,0.02)'}
                      onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}
                      onClick={() => setExpanded(expanded === e._id ? null : e._id)}>
                      <td className="px-4 py-3 font-semibold text-secondary-900">{e.name}</td>
                      <td className="px-4 py-3 text-secondary-600 text-xs">{e.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(37,99,235,0.07)', color: '#2563eb' }}>
                          {e.subject}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-secondary-500">
                        {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-bold"
                          style={{ background: STATUS_COLORS[e.status]?.bg, color: STATUS_COLORS[e.status]?.text }}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3" onClick={ev => ev.stopPropagation()}>
                        <select value={e.status}
                          onChange={ev => updateStatus(e._id, ev.target.value)}
                          className="input text-xs py-1 px-2 w-auto min-w-[120px]">
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                    {/* Expanded message row */}
                    {expanded === e._id && (
                      <tr style={{ background: 'rgba(248,250,252,0.8)', borderBottom: '1px solid rgba(226,232,240,0.5)' }}>
                        <td colSpan={6} className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            <MessageSquare size={14} className="text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-secondary-500 mb-1">Message</p>
                              <p className="text-sm text-secondary-700 leading-relaxed">{e.message}</p>
                              {e.phone && <p className="text-xs text-secondary-400 mt-2">📞 {e.phone}</p>}
                            </div>
                          </div>
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
            Showing {filtered.length} of {enquiries.length} enquiries · Click a row to view the message
          </div>
        )}
      </div>
    </div>
  );
}
