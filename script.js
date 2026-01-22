:root { --gold: #ffcc00; --blue: #00d9ff; --whatsapp: #25d366; --dark: #050505; --red: #ff4d4d; --verify-blue: #0084ff; --online: #00ff88; }
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; font-family: 'Cairo', sans-serif; }
body { margin: 0; background: var(--dark); color: #fff; overflow-x: hidden; background-image: radial-gradient(circle at center, #111 0%, #000 100%); min-height: 100vh; }

/* شاشة الدخول */
#splash { position: fixed; inset: 0; background: #000; z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: 0.8s; }
.splash-core { text-align: center; }
.splash-core i { font-size: 5rem; color: var(--gold); filter: drop-shadow(0 0 20px var(--gold)); animation: pulse 2s infinite; }
.dev-tag { margin-top: 25px; font-family: 'Changa'; font-size: 0.8rem; color: #555; letter-spacing: 2px; }
@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } }

/* الهيدر والبحث */
header { padding: 15px; position: fixed; top: 0; width: 100%; background: rgba(0,0,0,0.85); z-index: 1000; backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
.search-container { position: relative; width: 100%; }
.search-box { width: 100%; padding: 15px 45px 15px 15px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid #222; color: #fff; text-align: right; outline: none; font-size: 0.9rem; }
.search-icon { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: var(--gold); }

/* البطاقات وتنسيق VIP */
.card { width: 94%; margin: 30px auto; border-radius: 35px; background: rgba(255, 255, 255, 0.02); position: relative; border: 1px solid rgba(255, 255, 255, 0.06); padding: 25px; overflow: hidden; }
.vip-card { background: linear-gradient(145deg, #0d0d0d 0%, #1a1600 100%); border: 1px solid rgba(255, 204, 0, 0.3); }
.vip-banner { position: absolute; top: 0; right: 0; background: linear-gradient(90deg, transparent, rgba(255, 204, 0, 0.2)); padding: 8px 60px; color: var(--gold); font-family: 'Changa'; font-weight: 900; letter-spacing: 12px; font-size: 1.1rem; }
.rank-number { position: absolute; left: -15px; bottom: -30px; font-size: 8rem; font-weight: 900; color: rgba(255, 255, 255, 0.03); font-family: 'Changa'; z-index: 0; pointer-events: none; }

/* التحديث الجديد: الشارات وحالة الاتصال */
.badge-gold { color: var(--gold); margin-right: 8px; font-size: 1.1rem; filter: drop-shadow(0 0 5px var(--gold)); }
.badge-blue { color: var(--verify-blue); margin-right: 8px; font-size: 1.1rem; filter: drop-shadow(0 0 5px var(--verify-blue)); }
.status-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--online); background: rgba(0,255,136,0.08); padding: 5px 12px; border-radius: 12px; margin-bottom: 12px; font-weight: bold; border: 1px solid rgba(0,255,136,0.1); }
.dot { width: 7px; height: 7px; background: var(--online); border-radius: 50%; animation: blink 1.5s infinite; box-shadow: 0 0 8px var(--online); }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

.worker-n { font-size: 1.6rem; font-weight: 900; color: #fff; position: relative; z-index: 2; margin: 0; display: flex; align-items: center; }
.worker-m { font-size: 0.85rem; color: #aaa; margin: 8px 0; display: flex; align-items: center; gap: 6px; position: relative; z-index: 2; }
.stars { margin: 12px 0; color: #222; font-size: 1rem; position: relative; z-index: 2; }
.stars .on { color: var(--gold); filter: drop-shadow(0 0 5px var(--gold)); }

.price-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--gold); background: rgba(255, 204, 0, 0.1); padding: 10px 18px; border-radius: 15px; font-size: 0.85rem; cursor: pointer; margin: 10px 0; border: 1px solid rgba(255, 204, 0, 0.2); font-weight: bold; position: relative; z-index: 2; }

.btn-flex { display: flex; gap: 10px; margin-top: 15px; position: relative; z-index: 2; }
.btn-call { flex: 2; background: var(--blue); color: #000; padding: 15px; border-radius: 20px; text-align: center; font-weight: 900; text-decoration: none; }
.btn-ws { width: 55px; background: var(--whatsapp); color: #fff; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; text-decoration: none; }
.btn-share { width: 55px; background: rgba(255,255,255,0.08); color: #fff; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); }
.btn-mng { width: 55px; background: rgba(255,255,255,0.05); border: 1px solid #333; border-radius: 20px; display: flex; align-items: center; justify-content: center; color: #666; cursor: pointer; }

/* المودالات والنابار والتوست */
.modal { position: fixed; inset: 0; background: rgba(0,0,0,0.98); z-index: 50000; display: none; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(15px); }
.modal-body { background: #080808; padding: 30px; border-radius: 40px; width: 100%; max-width: 400px; border: 1px solid #1a1a1a; text-align: center; max-height: 85vh; overflow-y: auto; }
.inp { width: 100%; padding: 14px; border-radius: 18px; background: #000; border: 1px solid #222; color: #fff; margin-bottom: 12px; text-align: center; outline: none; }

nav { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; height: 70px; background: rgba(10,10,10,0.9); border-radius: 35px; display: flex; justify-content: space-around; align-items: center; border: 1px solid #222; z-index: 1000; }
.add-btn { width: 60px; height: 60px; background: var(--gold); border-radius: 20px; margin-top: -60px; border: 5px solid var(--dark); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #000; transform: rotate(45deg); box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
.add-btn i { transform: rotate(-45deg); }

.toast { position: fixed; top: -100px; left: 50%; transform: translateX(-50%); width: 85%; background: #fff; color: #000; padding: 18px; border-radius: 25px; z-index: 999999; transition: 0.6s; text-align: center; font-weight: 900; }
.toast.show { top: 30px; }
.price-item { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #111; color: #ccc; font-size: 0.9rem; }
/* أضف هذه الأسطر لملف style.css الخاص بك */

.nav-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; color: #555; transition: 0.3s; width: 80px; }
.nav-item i { font-size: 1.3rem; margin-bottom: 4px; }
.nav-item span { font-size: 0.65rem; font-weight: bold; }
.nav-item:hover { color: var(--gold); }

.order-card { width: 94%; margin: 15px auto; background: rgba(0, 217, 255, 0.03); border: 1px dashed rgba(0, 217, 255, 0.2); border-radius: 25px; padding: 20px; animation: fadeIn 0.5s ease; position: relative; }
.order-name { font-size: 1.1rem; font-weight: 900; color: var(--blue); margin-bottom: 5px; }
.order-phone { font-size: 0.85rem; color: #777; margin-bottom: 10px; }
.order-desc { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 15px; font-size: 0.95rem; line-height: 1.5; color: #eee; }
.order-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; }
.order-del { color: var(--red); cursor: pointer; font-size: 0.8rem; }
.order-call { background: var(--online); color: #000; padding: 7px 20px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 0.8rem; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
