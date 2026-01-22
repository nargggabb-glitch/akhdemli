const firebaseConfig = { databaseURL: "https://akhdemli-ace46-default-rtdb.europe-west1.firebasedatabase.app/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref('akhdemli_v2026_neon');
const orderDb = firebase.database().ref('akhdemli_orders');

const JOBS = {"بناء":"trowel-bricks", "دهان":"paint-roller", "كهربائي":"bolt", "رصاص":"faucet", "ميكانيكي":"car-side", "تبريد":"snowflake", "حداد":"fire", "نجار":"hammer", "حلاق":"user-tie", "خياطة":"shirt", "توصيل":"motorcycle", "بلاط":"th", "تصليح هواتف":"mobile-alt", "ألومنيوم":"window-maximize"};
const STATES = ["01 أدرار", "02 الشلف", "03 الأغواط", "04 أم البواقي", "05 باتنة", "06 بجاية", "07 بسكرة", "08 بشار", "09 البليدة", "10 البويرة", "11 تمنراست", "12 تبسة", "13 تلمسان", "14 تيارت", "15 تيزي وزو", "16 الجزائر", "17 الجلفة", "18 جيجل", "19 سطيف", "20 سعيدة", "21 سكيكدة", "22 سيدي بلعباس", "23 عنابة", "24 قالمة", "25 قسنطينة", "26 المدية", "27 مستغانم", "28 المسيلة", "29 معسكر", "30 ورقلة", "31 وهران", "32 البيض", "33 إليزي", "34 برج بوعريريج", "35 بومرداس", "36 الطارف", "37 تندوف", "38 تيسمسيلت", "39 الوادي", "40 خنشلة", "41 سوق أهراس", "42 تيبازة", "43 ميلة", "44 عين الدفلى", "45 النعامة", "46 عين تيموشنت", "47 غرداية", "48 غليزان", "49 تيميمون", "50 برج باجي مختار", "51 أولاد جلال", "52 بني عباس", "53 عين صالح", "54 عين قزام", "55 توقرت", "56 جانت", "57 المغير", "58 المنيعة"];

let curId = null;

window.onload = () => {
    setTimeout(() => { 
        document.getElementById('splash').style.opacity = '0'; 
        setTimeout(()=>document.getElementById('splash').style.display='none',800); 
    }, 3000);
    initInputs();
    db.on('value', snap => {
        window.data = [];
        snap.forEach(c => { window.data.push({...c.val(), id: c.key}); });
        renderHome();
    });
};

function initInputs() {
    Object.keys(JOBS).forEach(k => {
        const el = document.getElementById('j');
        if(el) el.innerHTML += `<option value="${k}">${k}</option>`;
    });
    STATES.forEach(v => {
        const el = document.getElementById('s');
        if(el) el.innerHTML += `<option value="${v}">${v}</option>`;
    });
}

function smartSearch() {
    const q = document.getElementById('search').value.trim().toLowerCase();
    if(q === "") { renderHome(); return; }
    const res = window.data.filter(i => i.name.toLowerCase().includes(q) || i.state.toLowerCase().includes(q) || i.job.toLowerCase().includes(q));
    renderList(null, res);
}

function renderHome() {
    const cont = document.getElementById('container');
    cont.innerHTML = '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:15px;">' + 
        Object.keys(JOBS).map(k => `<div onclick="renderList('${k}')" style="background:rgba(255,255,255,0.02); padding:22px 10px; border-radius:25px; text-align:center; border:1px solid rgba(255,255,255,0.05);"><i class="fas fa-${JOBS[k]}" style="display:block; font-size:1.8rem; margin-bottom:10px; color:var(--gold);"></i><b>${k}</b></div>`).join('') + '</div>';
}

function renderList(job, filtered = null) {
    const cont = document.getElementById('container');
    let list = filtered || window.data.filter(w => w.job === job);
    list.sort((a,b) => (b.rating || 0) - (a.rating || 0));

    cont.innerHTML = `<h2 style="padding:15px 25px;"><i class="fas fa-chevron-right" onclick="renderHome()" style="margin-left:15px; color:var(--gold);"></i> ${job || 'نتائج البحث'}</h2>`;
    
    list.forEach((w, index) => {
        const rating = w.rating || 0;
        let stars = ''; 
        for(let i=1; i<=5; i++) stars += `<i class="fas fa-star ${i<=Math.round(rating)?'on':''}" onclick="rate('${w.id}', ${i})"></i>`;

        let verifyBadge = '';
        if(rating >= 4.8) verifyBadge = '<i class="fas fa-check-circle badge-gold"></i>';
        else if(rating >= 3.5) verifyBadge = '<i class="fas fa-check-circle badge-blue"></i>';

        cont.innerHTML += `
            <div class="card ${w.type==='VIP'?'vip-card':''}">
                <div class="rank-number">${index + 1}</div>
                ${w.type==='VIP' ? '<div class="vip-banner">VIP</div>' : ''}
                <div class="status-tag"><span class="dot"></span> متصل الآن</div>
                <h3 class="worker-n">${w.name} ${verifyBadge}</h3>
                <div class="worker-m"><i class="fas fa-map-pin" style="color:var(--gold)"></i> ${w.state} - ${w.municipality}</div>
                <div class="stars">${stars} <span style="font-size:0.8rem; color:#444; margin-right:5px;">(${rating.toFixed(1)})</span></div>
                ${w.prices ? `<div class="price-btn" onclick="openPrices('${w.id}')"><i class="fas fa-tags"></i> عرض قائمة الأسعار</div>` : ''}
                <div class="btn-flex">
                    <a href="tel:${w.phone}" class="btn-call">اتصل</a>
                    <a href="https://wa.me/213${w.whatsapp || w.phone}" class="btn-ws"><i class="fab fa-whatsapp"></i></a>
                    <div class="btn-share" onclick="shareMe('${w.name}', '${w.job}', '${w.phone}')"><i class="fas fa-share-alt"></i></div>
                    <div class="btn-mng" onclick="openManage('${w.id}')"><i class="fas fa-fingerprint"></i></div>
                </div>
            </div>`;
    });
}

// --- وظائف طلبات الزبائن (المحدثة) ---

function renderOrders() {
    const cont = document.getElementById('container');
    const myOrderId = localStorage.getItem('my_order_id');

    // تغيير الزر العلوي بناءً على وجود طلب سابق
    const actionBtn = myOrderId 
        ? `<button onclick="askDeleteOrder('${myOrderId}')" style="background:var(--red); color:white; border:none; padding:10px 15px; border-radius:12px; font-weight:bold; font-size:0.75rem;">🗑️ حذف طلبي</button>`
        : `<button onclick="showM('orderModal')" style="background:var(--gold); border:none; padding:10px 15px; border-radius:12px; font-weight:bold; font-size:0.75rem;">+ نشر طلب</button>`;

    orderDb.on('value', snap => {
        let items = [];
        snap.forEach(c => { items.unshift({...c.val(), id: c.key}); });
        
        const html = items.map(o => `
            <div class="order-card" style="${o.id === myOrderId ? 'border: 2px solid var(--gold); background:rgba(255,204,0,0.05);' : ''}">
                <div class="order-name">${o.name} ${o.id === myOrderId ? '<span style="color:var(--gold); font-size:0.7rem;">(طلبي)</span>' : ''}</div>
                <div class="order-phone"><i class="fas fa-phone-alt"></i> ${o.phone}</div>
                <div class="order-desc">${o.desc}</div>
                <div class="order-footer">
                    ${o.id === myOrderId ? `<div class="order-del" onclick="askDeleteOrder('${o.id}')"><i class="fas fa-trash"></i> حذف</div>` : '<div></div>'}
                    <a href="tel:${o.phone}" class="order-call">اتصل الآن</a>
                </div>
            </div>
        `).join('');

        cont.innerHTML = `
            <div style="padding:20px; display:flex; justify-content:space-between; align-items:center;">
                <h2 style="margin:0;"><i class="fas fa-chevron-right" onclick="renderHome()" style="margin-left:10px; color:var(--gold);"></i> طلبات زبائن</h2>
                ${actionBtn}
            </div>
            ${items.length ? html : '<p style="text-align:center; color:#555; margin-top:50px;">لا توجد طلبات حالياً</p>'}
        `;
    });
}

function saveOrder() {
    if(localStorage.getItem('my_order_id')) {
        return toast("⚠️ لديك طلب نشط بالفعل! قم بحذفه أولاً.");
    }

    const n = document.getElementById('o_name').value;
    const p = document.getElementById('o_phone').value;
    const d = document.getElementById('o_desc').value;
    if(!n || !p || !d) return toast("⚠️ يرجى إكمال البيانات");
    
    const newRef = orderDb.push();
    newRef.set({ name: n, phone: p, desc: d, date: Date.now() })
    .then(() => {
        localStorage.setItem('my_order_id', newRef.key);
        toast("✅ تم نشر طلبك");
        closeM('orderModal');
        renderOrders();
    });
}

function askDeleteOrder(id) {
    const myId = localStorage.getItem('my_order_id');
    if (id !== myId) return toast("❌ لا يمكنك حذف طلبات الآخرين");

    showM('confirmOrderDelete');
    document.getElementById('btnConfirmDelete').onclick = () => {
        orderDb.child(id).remove().then(() => {
            localStorage.removeItem('my_order_id');
            toast("🗑️ تم حذف الطلب");
            closeM('confirmOrderDelete');
            renderOrders();
        });
    };
}

// --- الوظائف العامة ---

function shareMe(n, j, p) {
    const text = `أوصيك بالحرفي ${n} (${j}). اتصل به: ${p}. تطبيق AKHDEMLI 2026.`;
    if (navigator.share) {
        navigator.share({ title: 'مشاركة حرفي', text: text, url: window.location.href });
    } else {
        navigator.clipboard.writeText(text);
        toast("📋 تم نسخ بيانات الحرفي");
    }
}

function openPrices(id) {
    const item = window.data.find(x => x.id === id);
    document.getElementById('priceTitle').innerText = "أسعار " + item.name;
    document.getElementById('priceList').innerHTML = item.prices.split('\n').map(line => line.trim() ? `<div class="price-item"><span>${line}</span><i class="fas fa-check" style="color:var(--gold)"></i></div>` : '').join('');
    showM('priceModal');
}

function openManage(id) { curId = id; document.getElementById('vP').value = ""; showM('manageModal'); }

function handleM(act) {
    const p = document.getElementById('vP').value;
    const item = window.data.find(x => x.id === curId);
    if(p !== item.password) return toast("❌ الرمز السري غير مطابق");
    if(act === 'EDIT') {
        document.getElementById('editKey').value = item.id;
        document.getElementById('n').value = item.name;
        document.getElementById('p').value = item.phone;
        document.getElementById('ws_inp').value = item.whatsapp || "";
        document.getElementById('prices_inp').value = item.prices || "";
        document.getElementById('pass_inp').value = item.password || "";
        document.getElementById('m').value = item.municipality || "";
        closeM('manageModal'); showM('regModal');
    }
}

function handleDeleteStep() {
    const p = document.getElementById('vP').value;
    const item = window.data.find(x => x.id === curId);
    if(p !== item.password) return toast("❌ الرمز السري غير مطابق");
    showM('confirmDeleteModal');
}

function finalDelete() {
    db.child(curId).remove(); toast("🗑️ تم الحذف");
    closeM('confirmDeleteModal'); closeM('manageModal');
}

function save(type) {
    const editKey = document.getElementById('editKey').value;
    const p = document.getElementById('p').value;
    const pass = document.getElementById('pass_inp').value;
    if(!p || !document.getElementById('n').value || !pass) return toast("⚠️ أكمل البيانات");
    if(!editKey && window.data.some(x => x.phone === p)) return toast("❌ مسجل مسبقاً");

    const d = {
        name: document.getElementById('n').value, job: document.getElementById('j').value,
        state: document.getElementById('s').value, municipality: document.getElementById('m').value,
        phone: p, whatsapp: document.getElementById('ws_inp').value,
        password: pass, prices: document.getElementById('prices_inp').value, type: type
    };
    if(editKey) db.child(editKey).update(d); else db.push({...d, rating:0, votes:0});
    closeM('regModal'); toast("✅ تم الحفظ!");
}

function rate(id, val) {
    let voted = JSON.parse(localStorage.getItem('voted_neon') || "[]");
    if(voted.includes(id)) return toast("⚠️ قيمت سابقاً");
    db.child(id).once('value', s => {
        const d = s.val(); const nv = (d.votes || 0) + 1;
        const nr = (((d.rating || 0) * (d.votes || 0)) + val) / nv;
        db.child(id).update({ rating: nr, votes: nv });
        voted.push(id); localStorage.setItem('voted_neon', JSON.stringify(voted));
        toast("⭐ شكراً لتقييمك!");
    });
}

function showM(id) { document.getElementById(id).style.display = 'flex'; }
function closeM(id) { document.getElementById(id).style.display = 'none'; }
function toast(m) { const t = document.getElementById('toast'); document.getElementById('t-text').innerText = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }
