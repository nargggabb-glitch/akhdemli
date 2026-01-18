const firebaseConfig = { databaseURL: "https://akhdemli-ace46-default-rtdb.europe-west1.firebasedatabase.app/" };
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref('akhdemli_v2026_neon');

const JOBS = {"بناء":"trowel-bricks", "دهان":"paint-roller", "كهربائي":"bolt", "رصاص":"faucet", "ميكانيكي":"car-side", "تبريد":"snowflake", "حداد":"fire", "نجار":"hammer", "حلاق":"user-tie", "خياطة":"shirt", "توصيل":"motorcycle", "بلاط":"th", "تصليح هواتف":"mobile-alt", "ألومنيوم":"window-maximize"};
const STATES = ["01 أدرار", "02 الشلف", "03 الأغواط", "04 أم البواقي", "05 باتنة", "06 بجاية", "07 بسكرة", "08 بشار", "09 البليدة", "10 البويرة", "11 تمنراست", "12 تبسة", "13 تلمسان", "14 تيارت", "15 تيزي وزو", "16 الجزائر", "17 الجلفة", "18 جيجل", "19 سطيف", "20 سعيدة", "21 سكيكدة", "22 سيدي بلعباس", "23 عنابة", "24 قالمة", "25 قسنطينة", "26 المدية", "27 مستغانم", "28 المسيلة", "29 معسكر", "30 ورقلة", "31 وهران", "32 البيض", "33 إليزي", "34 برج بوعريريج", "35 بومرداس", "36 الطارف", "37 تندوف", "38 تيسمسيلت", "39 الوادي", "40 خنشلة", "41 سوق أهراس", "42 تيبازة", "43 ميلة", "44 عين الدفلى", "45 النعامة", "46 عين تيموشنت", "47 غرداية", "48 غليزان", "49 تيميمون", "50 برج باجي مختار", "51 أولاد جلال", "52 بني عباس", "53 عين صالح", "54 عين قزام", "55 توقرت", "56 جانت", "57 المغير", "58 المنيعة"];

let curId = null;

window.onload = () => {
    setTimeout(() => { document.getElementById('splash').style.opacity = '0'; setTimeout(()=>document.getElementById('splash').style.display='none',800); }, 3000);
    initInputs();
    db.on('value', snap => {
        window.data = [];
        snap.forEach(c => { window.data.push({...c.val(), id: c.key}); });
        renderHome();
    });
};

function initInputs() {
    Object.keys(JOBS).forEach(k => document.getElementById('j').innerHTML += `<option value="${k}">${k}</option>`);
    STATES.forEach(v => document.getElementById('s').innerHTML += `<option value="${v}">${v}</option>`);
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
        let stars = ''; const r = Math.round(w.rating || 0);
        for(let i=1; i<=5; i++) stars += `<i class="fas fa-star ${i<=r?'on':''}" onclick="rate('${w.id}', ${i})"></i>`;
        cont.innerHTML += `
            <div class="card ${w.type==='VIP'?'vip-card':''}">
                <div class="rank-number">${index + 1}</div>
                ${w.type==='VIP' ? '<div class="vip-banner">VIP</div>' : ''}
                <h3 class="worker-n">${w.name}</h3>
                <div class="worker-m"><i class="fas fa-map-pin" style="color:var(--gold)"></i> ${w.state} - ${w.municipality}</div>
                <div class="stars">${stars}</div>
                ${w.prices ? `<div class="price-btn" onclick="openPrices('${w.id}')"><i class="fas fa-tags"></i> عرض قائمة الأسعار</div>` : ''}
                <div class="btn-flex">
                    <a href="tel:${w.phone}" class="btn-call">اتصل</a>
                    <a href="https://wa.me/213${w.whatsapp || w.phone}" class="btn-ws"><i class="fab fa-whatsapp"></i></a>
                    <div class="btn-mng" onclick="openManage('${w.id}')"><i class="fas fa-fingerprint"></i></div>
                </div>
            </div>`;
    });
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
    if(!p || !document.getElementById('n').value || !pass) return toast("⚠️ أكمل البيانات بما فيها الرمز السري");
    if(!editKey && window.data.some(x => x.phone === p)) return toast("❌ مسجل مسبقاً");

    const d = {
        name: document.getElementById('n').value, job: document.getElementById('j').value,
        state: document.getElementById('s').value, municipality: document.getElementById('m').value,
        phone: p, whatsapp: document.getElementById('ws_inp').value,
        password: pass,
        prices: document.getElementById('prices_inp').value, type: type
    };
    if(editKey) db.child(editKey).update(d); else db.push({...d, rating:0, votes:0});
    closeM('regModal'); toast("✅ تم الحفظ بنجاح!");
}

function rate(id, val) {
    let voted = JSON.parse(localStorage.getItem('voted_neon') || "[]");
    if(voted.includes(id)) return toast("⚠️ قيمت سابقاً");
    db.child(id).once('value', s => {
        const d = s.val(); const nv = (d.votes || 0) + 1;
        const nr = (((d.rating || 0) * (d.votes || 0)) + val) / nv;
        db.child(id).update({ rating: nr, votes: nv });
        voted.push(id); localStorage.setItem('voted_neon', JSON.stringify(voted));
        toast("⭐ بطاقة شكر: شكراً لتقييمك!");
    });
}

function showM(id) { document.getElementById(id).style.display = 'flex'; }
function closeM(id) { document.getElementById(id).style.display = 'none'; }
function toast(m) { const t = document.getElementById('toast'); document.getElementById('t-text').innerText = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000); }