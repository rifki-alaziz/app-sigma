import { useState, useEffect } from "react";
import axios from "axios";

const NISHAB_EMAS = 85; // gram emas
const NISHAB_PERTANIAN = 653; // kg gabah
const ZAKAT_PERTANIAN_NONIRIGASI = 0.10; // 10%
const ZAKAT_PERTANIAN_IRIGASI = 0.05; // 5%
const HARGA_BERAS_DEFAULT = 15000; // default harga per kg untuk zakat fitrah

export default function KalkulatorZakat() {
    const [tab, setTab] = useState("mal");

    // Zakat Mal
    const [emas, setEmas] = useState(0);
    const [uang, setUang] = useState(0);

    // Perdagangan
    const [modal, setModal] = useState(0);
    const [untung, setUntung] = useState(0);
    const [utang, setUtang] = useState(0);

    // Fitrah
    const [jumlahJiwa, setJumlahJiwa] = useState(1);
    const [hargaBeras, setHargaBeras] = useState(HARGA_BERAS_DEFAULT);

    // Pertanian
    const [hasil, setHasil] = useState(0);
    const [pakaiIrigasi, setPakaiIrigasi] = useState(false);

    // Peternakan
    const [ternak, setternak] = useState(0);

    // Harga emas realtime
    const [hargaEmas, setHargaEmas] = useState<number | null>(null);
    const [, setLoadingEmas] = useState(true);

    useEffect(() => {
        // Ambil harga emas real-time dari harga-emas.org (API publik, pastikan CORS/Proxy jika error)
        setLoadingEmas(true);
        axios
            .get("https://api.harga-emas.org/api/latest")
            .then((res) => {
                // API ini mengembalikan harga dalam gram dan rupiah, ambil harga_emas
                // Lihat dokumentasi atau console.log(res.data)
                // Fallback jika format berubah
                let price = null;
                if (res.data && res.data.price) {
                    price = res.data.price;
                } else if (res.data && res.data["emas"]["harga"]) {
                    price = res.data["emas"]["harga"];
                }
                setHargaEmas(Number(price) || 1200000); // fallback ke 1.2 juta/gram
            })
            .catch(() => setHargaEmas(1200000))
            .finally(() => setLoadingEmas(false));
    }, []);

    // Kalkulasi zakat mal (emas & uang)
    const totalHarta = emas * (hargaEmas ?? 1200000) + uang;
    const nishabMal = NISHAB_EMAS * (hargaEmas ?? 1200000);
    const zakatMal = totalHarta >= nishabMal ? totalHarta * 0.025 : 0;

    // Kalkulasi zakat perdagangan
    const totalNiaga = modal + untung - utang;
    const zakatNiaga = totalNiaga >= nishabMal ? totalNiaga * 0.025 : 0;

    // Zakat Fitrah
    const totalFitrah = jumlahJiwa * 2.7 * hargaBeras;

    // Zakat Pertanian
    const nishabPertanian = NISHAB_PERTANIAN;
    const zakatPertanian =
        hasil >= nishabPertanian
            ? hasil * (pakaiIrigasi ? ZAKAT_PERTANIAN_IRIGASI : ZAKAT_PERTANIAN_NONIRIGASI)
            : 0;

    // Zakat ternak
    let zakatternak = 0;
    let keteranganternak = "-";
    if (ternak >= 40 && ternak < 121) {
        zakatternak = 1;
        keteranganternak = "1 ekor ternak (1 tahun)";
    } else if (ternak >= 121 && ternak < 201) {
        zakatternak = 2;
        keteranganternak = "2 ekor ternak (1 tahun)";
    } else if (ternak >= 201) {
        zakatternak = Math.floor(ternak / 100);
        keteranganternak = `${zakatternak} ekor ternak (setiap 100 ekor)`;
    } else {
        keteranganternak = "Belum wajib zakat";
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center tracking-wide drop-shadow-sm">
                <span className="inline-flex items-center gap-2">
                    <svg className="w-8 h-8 text-yellow-500 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="#fde047" /></svg>
                    Kalkulator Zakat
                </span>
                <span className="block text-sm font-medium text-blue-400 mt-1 tracking-widest">Kitab Salaf</span>
            </h1>

            {/* Animated Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[
                    { key: "mal", label: "Zakat Mal", icon: <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8V4m0 0C7.582 4 4 7.582 4 12v0c0 4.418 3.582 8 8 8v0c4.418 0 8-3.582 8-8v0c0-4.418-3.582-8-8-8z" /></svg> },
                    { key: "niaga", label: "Zakat Perdagangan", icon: <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M2 10h20M5 10v10h14V10m-7 0V4m2 0h-4m2 0v6" /></svg> },
                    { key: "fitrah", label: "Zakat Fitrah", icon: <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg> },
                    { key: "pertanian", label: "Zakat Pertanian", icon: <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 21v-7a4 4 0 014-4h10a4 4 0 014 4v7" /><path d="M16 3h-1a2 2 0 00-2 2v5" /></svg> },
                    { key: "ternak", label: "Zakat ternak", icon: <svg className="w-5 h-5 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 19a2 2 0 002 2h12a2 2 0 002-2v-6a6 6 0 10-12 0v6z" /></svg> },
                ].map((tabObj) => (
                    <button
                        key={tabObj.key}
                        className={`
            flex items-center px-4 py-2 rounded-full font-semibold border transition-all duration-200
            ${tab === tabObj.key
                                ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white border-blue-600 shadow-lg scale-105"
                                : "bg-gray-50 border-gray-200 text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                            }
          `}
                        onClick={() => setTab(tabObj.key)}
                    >
                        {tabObj.icon}
                        {tabObj.label}
                    </button>
                ))}
            </div>


            {/* HARGA EMAS */}
            <div className="mb-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center justify-between">
                    <span className="font-medium text-yellow-800">
                        Harga Emas 24K Bisa Berubah Setiap Waktu
                    </span>
                    <span className="font-semibold text-yellow-700">
                    </span>
                </div>
            </div>

            {/* ZAKAT MAL */}
            {tab === "mal" && (
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <label className="block text-sm mb-2 font-medium">Jumlah emas (gram):</label>
                        <input
                            type="number"
                            className="input"
                            value={emas}
                            min={0}
                            onChange={e => setEmas(Number(e.target.value))}
                            placeholder="contoh: 100"
                        />
                        <label className="block text-sm mt-4 mb-2 font-medium">Jumlah uang (rupiah):</label>
                        <input
                            type="number"
                            className="input"
                            value={uang}
                            min={0}
                            onChange={e => setUang(Number(e.target.value))}
                            placeholder="contoh: 20000000"
                        />
                        <div className="mt-4 text-sm text-gray-500">
                            Nishab = {NISHAB_EMAS} gram emas (
                            {(nishabMal).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })})
                            &amp; haul 1 tahun.
                        </div>
                    </div>
                    <div className="mt-6 bg-white rounded-xl shadow p-4 text-center">
                        <p className="mb-2">Zakat yang wajib dikeluarkan:</p>
                        <div className="text-2xl font-bold text-blue-700">
                            {zakatMal > 0
                                ? zakatMal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                                : "Belum wajib zakat"}
                        </div>
                        <div className="text-xs mt-2 text-gray-500">
                            (2,5% dari total harta, jika telah nishab &amp; haul)
                        </div>
                    </div>
                </div>
            )}

            {/* ZAKAT PERDAGANGAN */}
            {tab === "niaga" && (
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <label className="block text-sm mb-2 font-medium">Modal usaha (rupiah):</label>
                        <input type="number" className="input" value={modal} min={0} onChange={e => setModal(Number(e.target.value))} />
                        <label className="block text-sm mt-4 mb-2 font-medium">Laba/keuntungan (rupiah):</label>
                        <input type="number" className="input" value={untung} min={0} onChange={e => setUntung(Number(e.target.value))} />
                        <label className="block text-sm mt-4 mb-2 font-medium">Utang dagang jatuh tempo (rupiah):</label>
                        <input type="number" className="input" value={utang} min={0} onChange={e => setUtang(Number(e.target.value))} />
                        <div className="mt-4 text-sm text-gray-500">
                            Nishab = {NISHAB_EMAS} gram emas (
                            {(nishabMal).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}),
                            haul 1 tahun.
                        </div>
                    </div>
                    <div className="mt-6 bg-white rounded-xl shadow p-4 text-center">
                        <p className="mb-2">Zakat yang wajib dikeluarkan:</p>
                        <div className="text-2xl font-bold text-blue-700">
                            {zakatNiaga > 0
                                ? zakatNiaga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                                : "Belum wajib zakat"}
                        </div>
                        <div className="text-xs mt-2 text-gray-500">
                            (2,5% dari harta niaga, jika telah nishab & haul)
                        </div>
                    </div>
                </div>
            )}

            {/* ZAKAT FITRAH */}
            {tab === "fitrah" && (
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <label className="block text-sm mb-2 font-medium">Jumlah Jiwa:</label>
                        <input type="number" className="input" value={jumlahJiwa} min={1} onChange={e => setJumlahJiwa(Number(e.target.value))} />
                        <label className="block text-sm mt-4 mb-2 font-medium">Harga Beras/kg:</label>
                        <input type="number" className="input" value={hargaBeras} min={1000} step={500} onChange={e => setHargaBeras(Number(e.target.value))} />
                        <div className="mt-4 text-sm text-gray-500">
                            1 jiwa = 2,7 kg makanan pokok. Harga per kg beras: {hargaBeras.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </div>
                    </div>
                    <div className="mt-6 bg-white rounded-xl shadow p-4 text-center">
                        <p className="mb-2">Zakat Fitrah yang wajib dikeluarkan:</p>
                        <div className="text-2xl font-bold text-blue-700">
                            {totalFitrah.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} atau {jumlahJiwa * 2.7} kg beras
                        </div>
                        <div className="text-xs mt-2 text-gray-500">
                            (Zakat fitrah boleh beras/makanan pokok atau senilai uang)
                        </div>
                    </div>
                </div>
            )}

            {/* ZAKAT PERTANIAN */}
            {tab === "pertanian" && (
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <label className="block text-sm mb-2 font-medium">Total hasil panen (kg gabah):</label>
                        <input type="number" className="input" value={hasil} min={0} onChange={e => setHasil(Number(e.target.value))} />
                        <label className="inline-flex items-center mt-3">
                            <input type="checkbox" className="mr-2" checked={pakaiIrigasi} onChange={e => setPakaiIrigasi(e.target.checked)} />
                            Pakai irigasi/pengairan?
                        </label>
                        <div className="mt-4 text-sm text-gray-500">
                            Nishab = {NISHAB_PERTANIAN} kg gabah.
                        </div>
                    </div>
                    <div className="mt-6 bg-white rounded-xl shadow p-4 text-center">
                        <p className="mb-2">Zakat yang wajib dikeluarkan:</p>
                        <div className="text-2xl font-bold text-blue-700">
                            {zakatPertanian > 0 ? `${zakatPertanian.toLocaleString('id-ID')} kg gabah` : "Belum wajib zakat"}
                        </div>
                        <div className="text-xs mt-2 text-gray-500">
                            ({pakaiIrigasi ? "5%" : "10%"} dari hasil panen jika mencapai nishab)
                        </div>
                    </div>
                </div>
            )}

            {/* ZAKAT ternak */}
            {tab === "ternak" && (
                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <label className="block text-sm mb-2 font-medium">Jumlah ternak/domba:</label>
                        <input type="number" className="input" value={ternak} min={0} onChange={e => setternak(Number(e.target.value))} />
                        <div className="mt-4 text-sm text-gray-500">
                            Nishab: 40 ekor (lihat tabel kitab salaf)
                        </div>
                    </div>
                    <div className="mt-6 bg-white rounded-xl shadow p-4 text-center">
                        <p className="mb-2">Zakat yang wajib dikeluarkan:</p>
                        <div className="text-2xl font-bold text-blue-700">
                            {keteranganternak}
                        </div>
                        <div className="text-xs mt-2 text-gray-500">
                            (Mengikuti aturan fiqih, kitab klasik: Fathul Qarib, Kifayatul Akhyar, dsb)
                        </div>
                    </div>
                </div>
            )}

            <div className="text-xs text-gray-500 text-center mt-8">
                Sumber: Fathul Qarib, Kifayatul Akhyar, Safinatun Najah, & Bulughul Maram<br />
                <span className="italic">Harga emas dari harga-emas.org</span>
            </div>
        </div>
    );
}
