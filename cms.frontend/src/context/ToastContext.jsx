import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, LoaderCircle, ShoppingCart, X } from 'lucide-react';
import './ToastContext.css';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  cart: ShoppingCart,
  loading: LoaderCircle,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    window.clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((items) => items.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((toast) => {
    const id = toast.id || `${Date.now()}-${Math.random()}`;
    const duration = toast.duration ?? 3200;
    const nextToast = {
      id,
      type: toast.type || 'info',
      title: toast.title,
      message: toast.message,
      loading: Boolean(toast.loading),
      duration,
    };

    setToasts((items) => [nextToast, ...items.filter((item) => item.id !== id)].slice(0, 4));

    window.clearTimeout(timersRef.current[id]);
    if (!nextToast.loading && duration > 0) {
      timersRef.current[id] = window.setTimeout(() => removeToast(id), duration);
    }

    return id;
  }, [removeToast]);

  const updateToast = useCallback((id, toast) => {
    const duration = toast.duration ?? 2800;

    setToasts((items) => items.map((item) => (
      item.id === id
        ? { ...item, ...toast, duration, loading: Boolean(toast.loading) }
        : item
    )));

    window.clearTimeout(timersRef.current[id]);
    if (!toast.loading && duration > 0) {
      timersRef.current[id] = window.setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const showCartToast = useCallback((productName, quantity = 1) => {
    const id = showToast({
      type: 'loading',
      title: 'Đang thêm vào giỏ hàng',
      message: productName,
      loading: true,
      duration: 0,
    });

    window.setTimeout(() => {
      updateToast(id, {
        type: 'cart',
        title: 'Đã thêm vào giỏ hàng',
        message: `${quantity} x ${productName}`,
        loading: false,
        duration: 3000,
      });
    }, 520);
  }, [showToast, updateToast]);

  return (
    <ToastContext.Provider value={{ showToast, showCartToast, removeToast }}>
      {children}
      <div className="toast-viewport" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => {
          const Icon = toast.loading ? LoaderCircle : toastIcons[toast.type] || Info;

          return (
            <div className={`app-toast toast-${toast.type}`} key={toast.id}>
              <div className="toast-icon-wrap">
                <Icon className={toast.loading ? 'toast-spinner' : ''} size={20} />
              </div>
              <div className="toast-body">
                <div className="toast-title">{toast.title}</div>
                {toast.message && <div className="toast-message">{toast.message}</div>}
              </div>
              <button type="button" className="toast-close" onClick={() => removeToast(toast.id)} aria-label="Đóng thông báo">
                <X size={16} />
              </button>
              {!toast.loading && <span className="toast-progress" style={{ animationDuration: `${toast.duration}ms` }} />}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
