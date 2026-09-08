import React from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useMall } from '../../context/MallContext';

export const NotificationToast = () => {
  const { notifications } = useMall();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="pointer-events-auto bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/60 rounded-2xl p-4 shadow-elevated flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="mt-0.5">
            {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {notif.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
            {notif.type === 'info' && <Bell className="w-5 h-5 text-brand-400 animate-bounce" />}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white tracking-tight">{notif.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{notif.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
