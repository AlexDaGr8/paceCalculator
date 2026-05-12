
for (let i = 4; i < 20; i += 0.5) {
    const mph = i;
    const mpm = 60 / mph;
    const mileInKM = 1.609344;
    const mpk = mpm / mileInKM;
    const marathon = 42.195;
    const oneLap = (mileInKM * 10) / 4;
    const data = [
        convertToTimeStr(mpm), // min / mile
        convertToTimeStr(mpk), // min / km
        `${i}`, // mph
        convertToTimeStr(mpm / oneLap, true),
        convertToTimeStr(mpk * 5), // 5k time
        convertToTimeStr(mpk * 10), // 10k time
        convertToTimeStr(mpm * 10), // 10 mile time
        convertToTimeStr(mpk * (marathon / 2)), // half time
        convertToTimeStr(mpk * marathon) // marathon time
    ];

    createTrData(data);
}

function convertToTimeStr(pace) {
    const mpmMin = Math.trunc(pace);
    const mpmHr = Math.trunc(mpmMin / 60);
    const mpmSec = Math.trunc((pace % 1) * 60);

    return `${mpmHr > 0 ? mpmHr + ':' : ''}${String(mpmMin % 60).padStart(2, '0')}:${String(mpmSec).padStart(2, '0')}`
}

function createTrData(data) {
    const tr = document.createElement('tr');

    for (const d of data) {
        const td = document.createElement('td');
        td.textContent = d;
        tr.appendChild(td)
    }

    const table = document.getElementById('helpful-paces');

    table.querySelector('tbody').appendChild(tr);
}