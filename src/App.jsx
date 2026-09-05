import { useState } from 'react';
import './App.css';
//thêm món và hình ảnh ở đây
const foodOptions = [
  { id: 'f1', name: 'Phở', image: '/phoga.jpg', emoji: '🍜' },
  { id: 'f2', name: 'Ốc', image: '/oc.jpg', emoji: '🐌' },
  { id: 'f3', name: 'Caramen', image: '/caramen.jpg', emoji: '🍢' },
  { id: 'f4', name: 'Phở Cuốn', image: '/phocuon.jpg', emoji: '🍡' },
  { id: 'f5', name: 'Chè', image: '/che.jpg', emoji: '🍧' },
  { id: 'f6', name: 'Pizza', image: '/pizza.jpg', emoji: '🍕' },
  { id: 'f7', name: 'Jollibee', image: '/jollibee.jpg', emoji: '�' },
  { id: 'f8', name: 'Thaiand food', image: '/dothai.jpg', emoji: '' },
  { id: 'f9', name: 'Bún Bò Huế', image: '/bunbohue.jpg', emoji: '' },
  { id: 'f10', name: 'Nem chua nướng', image: '/nemnuong.jpg', emoji: '' },
  { id: 'f11', name: 'Bún r iêu', image: '/bunrieu.jpg', emoji: '' },
  { id: 'f12', name: 'Đồ Hàn', image: '/dohan.jpg', emoji: '' },
  { id: 'f13', name: 'Bánh Ram Ít', image: '/ramit.webp', emoji: '' },
  { id: 'f14', name: 'Bánh Rán Mật', image: '/banhgianmat.jpg', emoji: '' },
  { id: 'f15', name: 'Cốm', image: '/com.jpg', emoji: '' },

  // Ô đặc biệt: Random
  { id: 'f16', name: '???', image: '/random.jpg', emoji: '🤫' },
];
// --- DANH SÁCH WORKSHOP
const workshopOptions = [
  { id: 'w1', name: 'Làm Nến Thơm', image: '/nen.jpg', emoji: '🕯️' },//https://www.facebook.com/Lamor.Studio/ Liên hệ qua fanpage, https://workshopcandles.com/workshop/ Đăng ký qua web
  { id: 'w2', name: 'Làm Gốm', image: '/gom.webp', emoji: '🥣' },// Đăng ký qua web https://workshop.potteryhaidoan.vn/?gad_source=1&gad_campaignid=20210266750&gbraid=0AAAAADzU81mzr-2DdfRI3nW8uzEnRgw-l&gclid=Cj0KCQjwkt_UBhDMARIsALpnOAx225nLEBC2nxh9WqzBXLYKWtZpe1cTGSXj6w2HzIA9NiakJuTMpLkaArIxEALw_wcB
  { id: 'w3', name: 'Làm Bánh', image: '/banh.webp', emoji: '📿' }, //https://abby.vn/workshop/
];
const movieOptions = [
  { id: 'm1', name: 'Hộ Linh Tráng Sĩ (Rút Gọn)', image: '/movie1.jpg', emoji: '😂' },
  { id: 'm2', name: 'Nghỉ Hè Sợ Nghỉ Hưu', image: '/horror.jpg', emoji: '👻' },
  { id: 'm3', name: 'Harry Potter Và Hòn Đá Phù Thủy: Kỷ Niệm 25 Năm', image: '/movie3.jpg', emoji: '💖' },
  { id: 'm4', name: 'HOPE Vùng Tử Địa', image: '/movie4.jpg', emoji: '💥' },
  { id: 'm5', name: 'INSIDIOUS: Ranh Giới Vô Định', image: '/movie5.jpg', emoji: '🎬' },
];
function App() {
  // Nút NO lúc đầu nằm ở bên phải (right: 25%)
  const [noPosition, setNoPosition] = useState({ right: '25%', top: '50%', transform: 'translateY(-50%)' });
  const [yesScale, setYesScale] = useState(1);
  const [step, setStep] = useState(1); 
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [customRequest, setCustomRequest] = useState(''); // THÊM DÒNG NÀY
  const [dateData, setDateData] = useState({
    date: '',
    activity: '',
    extras: []
  });
  const [popup, setPopup] = useState({ show: false, message: '' });

  const triggerPopup = (msg) => {
    setPopup({ show: true, message: msg });
  };

  const closePopup = () => {
    setPopup({ show: false, message: '' });
  };
  const handleDateChange = (e) => {
    setDateData({ ...dateData, date: e.target.value });
  };

  const handleDateSubmit = () => {
    if (!dateData.date) {
      triggerPopup("Please pick a date first! 🥺");
      return;
    }
    setStep(4); 
  };
  // Các hàm Submit sửa lại để quay về trang 4
  const handleFoodSubmit = () => {
    if (selectedFoods.length === 0) {
      triggerPopup("Chọn ít nhất 1 món hoặc chọn '???' đi nè! 🤤");
      return;
    }
    setStep(4); // QUAY VỀ TRANG 4
  };

  const handleWorkshopSubmit = () => {
    if (selectedWorkshops.length === 0) {
      triggerPopup("Chọn ít nhất 1 cái hoặc '???' đi mà! 🥺");
      return;
    }
    setStep(4); // QUAY VỀ TRANG 4
  };

  const handleMovieSubmit = () => {
    if (selectedMovies.length === 0) {
      triggerPopup("Chọn ít nhất 1 phim hoặc chọn '???' đi nè! 🍿");
      return;
    }
    setStep(4); // QUAY VỀ TRANG 4
  };

  // Hàm mới cho Yêu cầu riêng
  const handleCustomSubmit = () => {
    setStep(4); // QUAY VỀ TRANG 4
  };

  // Hàm mới khi bấm "XONG RỒI" ở trang 4
  const handleGoToConfirm = () => {
    if (selectedFoods.length === 0 && selectedWorkshops.length === 0 && selectedMovies.length === 0 && !customRequest && dateData.activity !== 'Board Game' && dateData.activity !== 'Surprise Me') {
      triggerPopup("Cậu chọn ít nhất 1 hoạt động nha! 🥺");
      return;
    }
    setStep(7);
  };
  const handleActivitySelect = (act) => {
    if (act === 'Food Tour') setStep(5);
    else if (act === 'Art Workshop') setStep(6);
    else if (act === 'Movie Night') setStep(8);
    else if (act === 'Custom Request') setStep(9);
    else if (act === 'Board Game') {
      setDateData(prev => ({
        ...prev,
        activity: prev.activity === 'Board Game' ? '' : 'Board Game'
      }));
    }
    else if (act === 'Surprise Me') {
      setDateData(prev => ({ ...prev, activity: 'Surprise Me' }));
      setSelectedFoods([]);
      setSelectedMovies([]);
      setSelectedWorkshops([]);
      // ĐÃ XÓA DÒNG setCustomRequest(''); ĐỂ GIỮ LẠI LỜI NHẮN CỦA BẠN ẤY
      setStep(7); 
    }
  };

  const handleBack = () => {
    if (step === 5 || step === 6 || step === 8 || step === 9) {
      setStep(4);
    } 
    else if (step === 7) {
      setStep(4);
      // Nếu vừa từ Surprise Me quay lại thì reset activity
      if (dateData.activity === 'Surprise Me') {
        setDateData(prev => ({ ...prev, activity: '' }));
      }
    } 
    else if (step > 3) {
      setStep(step - 1);
    }
  };
  const handleNoHover = () => {
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;
    // Khi hover, nó nhảy sang các tọa độ ngẫu nhiên
    setNoPosition({ top: `${top}%`, left: `${left}%` });
  };

  const handleNoClick = () => {
    setYesScale(prev => Math.min(prev + 0.3, 2.5)); 
  };
  const toggleWorkshop = (workshopName) => {
    setSelectedWorkshops(prev => {
      if (prev.includes(workshopName)) {
        return prev.filter(item => item !== workshopName);
      }
      return [...prev, workshopName];
    });
  };
  const toggleMovie = (movieName) => {
    setSelectedMovies(prev => {
      if (prev.includes(movieName)) {
        return prev.filter(item => item !== movieName);
      }
      return [...prev, movieName];
    });
  };

  const handleYesClick = () => {
    setStep(2); 
    setTimeout(() => {
      setStep(3); 
    }, 3500); 
  };
  const [selectedFoods, setSelectedFoods] = useState([]);

  // Hàm chọn/bỏ chọn món ăn
  const toggleFood = (foodName) => {
    setSelectedFoods(prev => {
      // Nếu món đã có trong danh sách -> Bấm vào sẽ xóa đi (bỏ chọn)
      if (prev.includes(foodName)) {
        return prev.filter(item => item !== foodName);
      }
      // Nếu chưa có -> Thêm vào danh sách
      return [...prev, foodName];
    });
  };

  
  const handleFinalSend = async () => {
    // Dán URL Webhook Discord của bạn vào đây
    const webhookUrl = "https://discord.com/api/webhooks/1543983290254626816/jtar3sMHG2Y7A72ewO81Af9oAf6ngATntAGCBbNJdowK-hbuZSr7CxDuwFZS5OOE1q8F"; 

    // Định dạng nội dung tin nhắn gửi đi
    const message = {
      content: "🎉 **CÓ LỜI MỜI HẸN HÒ MỚI ĐƯỢC CHẤP NHẬN!** 🎉",
      embeds: [
        {
          title: "💌 Date Invitation Details",
          color: 0xff4d88,
          fields: [
            { name: "📅 Ngày hẹn", value: dateData.date || "Chưa chọn", inline: false },
            { name: "🎯 Hoạt động khác", value: dateData.activity || "Không có", inline: false },
            { name: "🍜 Food Tour", value: selectedFoods.length > 0 ? selectedFoods.join(", ") : "Không chọn", inline: false },
            { name: "🍿 Movie Night", value: selectedMovies.length > 0 ? selectedMovies.join(", ") : "Không chọn", inline: false },
            { name: "🎨 Workshop", value: selectedWorkshops.length > 0 ? selectedWorkshops.join(", ") : "Không chọn", inline: false },
            { name: "✍️ Yêu cầu riêng", value: customRequest || "Không có", inline: false }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // Đổi các dòng alert báo lỗi và thành công thành triggerPopup
      if (response.ok) {
        triggerPopup("You just made my day!💖");
      } else {
        triggerPopup("Úi, có lỗi khi gửi đi rồi, kiểm tra lại Webhook URL nhé! 🥺");
      }
    } catch (error) {
      triggerPopup("Không thể kết nối tới Discord!");
    }
  };
  return (
    <div className="relative w-screen h-screen bg-[#ffb6c1] overflow-hidden flex flex-col items-center justify-center font-['VT323']">
      {/* 3. DẢI MÂY TO Ở ĐÁY MÀN HÌNH (LỚP DƯỚI CÙNG: z-0) */}
      <img 
        src="/cloud_bottom.png" 
        alt="Bottom Cloud" 
        // - absolute bottom-0: Dính sát mép dưới
        // - z-0: Lớp dưới cùng, không che mất các nút bấm
        // - translate-y-[25%]: Kéo tụt ảnh xuống 25% để giấu đi phần nền trong suốt bị thừa ở đáy ảnh gốc
        className="absolute bottom-0 left-0 w-full h-auto object-cover object-bottom pointer-events-none z-0 opacity-80 pixelated translate-y-[10%]"
      />

      {/* 1. Đám mây 1 (Mưa hồng) - (z-[1] nằm trên đám mây to) */}
      <img 
        src="/cloud1.png" 
        alt="Decor Cloud 1" 
        className="bg-cloud animate-float-slow w-40 md:w-72 top-[10%] left-[5%] md:left-[10%] z-[1]"
      />

      {/* 2. Đám mây 2 (Trái tim) - (z-[1] nằm trên đám mây to) */}
      <img 
        src="/cloud2.png" 
        alt="Decor Cloud 2" 
        className="bg-cloud animate-float-slower w-48 md:w-80 top-[20%] md:top-[40%] right-[2%] md:right-[10%] z-[1]"
      />
      {step >= 4 && (
        <button 
          onClick={handleBack}
          // Đã thu nhỏ px-3 cho mobile, md:px-4 cho máy tính, giảm gap xuống
          className="absolute top-4 left-4 md:top-8 md:left-8 bg-white text-[#ff4d88] text-2xl font-bold px-3 py-2 md:px-4 border-4 border-[#ff4d88] rounded shadow-[3px_3px_0_0_#ff4d88] transition-transform duration-200 hover:bg-pink-50 hover:scale-105 active:scale-95 z-50 flex items-center justify-center gap-1 md:gap-2 cursor-pointer"
        >
          <span>←</span>
          {/* Class hidden md:inline sẽ giấu chữ Back trên điện thoại và hiện trên máy tính */}
          <span className="hidden md:inline text-xl">Back</span>
        </button>
      )}
      {/* ------------------------- */}
      {/* --- TRANG 1: LỜI MỜI --- */}
      {step === 1 && (
        <div className="flex flex-col items-center z-10 w-full max-w-2xl px-4">
          <div className="bg-[#e0f7fa] p-2 mb-4 md:mb-6 rounded-lg border-4 border-[#ff7eb3] shadow-[4px_4px_0_0_#ff4d88]">
            {/* Chỉnh ảnh bé hơn 1 chút trên mobile */}
            <img src="/cute-bears1.png" alt="Cute Bears" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded" />
          </div>

          {/* Chữ trên mobile là text-5xl, máy tính là text-7xl */}
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-2 md:mb-4 tracking-widest drop-shadow-[4px_4px_0_#ff4d88] text-center">
            IT'S A DATE!
          </h1>
          <p className="text-white text-xl md:text-3xl mb-8 md:mb-12 tracking-wide drop-shadow-[2px_2px_0_#ff4d88] text-center">
            Will you go on a date with me?
          </p>

          <div className="relative w-full h-32 md:h-40">
            {/* NÚT YES */}
            <button 
              onClick={handleYesClick}
              style={{ 
                transform: `translateY(-50%) scale(${yesScale})`, 
                left: '15%', // Đẩy ra rìa hơn trên mobile
                top: '50%' 
              }}
              // Trên mobile nút rộng 90px, máy tính rộng 120px
              className="absolute md:left-[25%] w-[90px] h-[45px] md:w-[120px] md:h-[50px] flex justify-center items-center bg-white text-[#ff4d88] text-xl md:text-2xl border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-300 hover:bg-pink-50 cursor-pointer z-10"
            >
              YES
            </button>
            
            {/* NÚT NO */}
            <button 
              onMouseEnter={handleNoHover}
              onClick={handleNoClick}
              // Mặc định lúc đầu nằm bên phải (right: 15% mobile, 25% PC)
              style={{ ...noPosition, position: 'absolute', transform: noPosition.transform || 'translateY(-50%)' }}
              className="w-[90px] h-[45px] md:w-[120px] md:h-[50px] flex justify-center items-center bg-white text-[#ff4d88] text-xl md:text-2xl border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-all duration-200 z-20 cursor-pointer"
            >
              NO
            </button>
          </div>
        </div>
      )}

      {/* --- TRANG 2: HIỆU ỨNG BAY --- */}
      {step === 2 && (
        // Bổ sung 'flex-col' vào thẻ div này để chữ nằm trên bản đồ
        <div className="absolute inset-0 bg-[#005c94] flex flex-col justify-center items-center z-50 p-2 md:p-8">
          
          {/* Dòng chữ Welcome nhấp nháy nhẹ */}
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase animate-pulse">
            Welcome back to Vietnam! 🥰
          </h2>

          <div className="relative w-[95vw] md:max-w-6xl bg-[#005c94] border-4 md:border-[6px] border-white shadow-2xl rounded-xl md:rounded-2xl overflow-hidden">
            
            <img src="/map.png" alt="Map" className="w-full h-auto block pixelated" />

            <div className="airplane-moving-wrapper absolute z-20 w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40">
               <img 
                 src="/airplane.png" 
                 alt="Airplane" 
                 className="w-full h-auto drop-shadow-lg md:drop-shadow-xl pixelated" 
                 style={{ transform: 'scaleX(-1)' }} 
               />
               <img 
                  src="/face.png" 
                  alt="Face" 
                  className="absolute top-[20%] left-[30%] w-[45%] h-[45%] rounded-full object-cover border-2 border-white z-20 shadow-md"
                />
            </div>
          </div>
        </div>
      )}

      {/* --- TRANG 3: PICK A DATE --- */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center w-full max-w-md px-4 z-10 animate-fade-in">
          
          <div className="bg-[#e0f7fa] p-2 mb-6 rounded-lg border-4 border-[#ff7eb3] shadow-[4px_4px_0_0_#ff4d88]">
             {/* Bạn có thể đổi ảnh khác tùy thích */}
            <img src="/cute-bears2.gif" alt="Cute Bears" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded" />
          </div>

          <h1 className="text-white text-5xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase">
            Pick a date
          </h1>
          <p className="text-white text-xl md:text-2xl mb-10 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center">
            Choose the day for our cute little plan.
          </p>

          <div className="flex flex-col w-full gap-6 items-center">
            {/* Input Chọn Ngày */}
            <input 
              type="date" 
              value={dateData.date}
              onChange={handleDateChange}
              className="w-[80%] md:w-full h-14 bg-white text-[#ff4d88] text-2xl font-bold px-4 border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] outline-none text-center cursor-pointer"
            />
            
            {/* Nút Continue */}
            <button 
              onClick={handleDateSubmit}
              className="w-[80%] md:w-full h-14 bg-white text-[#ff4d88] text-2xl font-bold border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-2"
            >
              Continue <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* --- TRANG 4: WHAT WOULD YOU LIKE TO DO? (TRUNG TÂM) --- */}
      {step === 4 && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 z-10 animate-fade-in pb-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight mt-10">
            What would you<br/>like to do?
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center">
            Pick ANYTHING you want!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl">
            {/* 1. Food Tour */}
            <button onClick={() => handleActivitySelect('Food Tour')} className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 h-32">
              <span className="text-4xl mb-2">🛵</span><span className="text-[#ff4d88] text-xl font-bold uppercase text-center leading-none">Food Tour</span>
              {selectedFoods.length > 0 && <span className="text-[#22c55e] text-sm mt-1">({selectedFoods.length} selected)</span>}
            </button>
            {/* 2. Movie Night */}
            <button onClick={() => handleActivitySelect('Movie Night')} className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 h-32">
              <span className="text-4xl mb-2">🍿</span><span className="text-[#ff4d88] text-xl font-bold uppercase text-center leading-none">Movie Night</span>
              {selectedMovies.length > 0 && <span className="text-[#22c55e] text-sm mt-1">({selectedMovies.length} selected)</span>}
            </button>
            {/* 3. Art Workshop */}
            <button onClick={() => handleActivitySelect('Art Workshop')} className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 h-32">
              <span className="text-4xl mb-2">🎨</span><span className="text-[#ff4d88] text-xl font-bold uppercase text-center leading-none">Workshop</span>
              {selectedWorkshops.length > 0 && <span className="text-[#22c55e] text-sm mt-1">({selectedWorkshops.length} selected)</span>}
            </button>
            {/* 4. Board Game */}
            <button onClick={() => handleActivitySelect('Board Game')} className={`flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 h-32 ${dateData.activity === 'Board Game' ? 'bg-[#ffe4e1] border-[#22c55e]' : ''}`}>
              <span className="text-4xl mb-2">🎲</span>
              <span className="text-[#ff4d88] text-xl font-bold uppercase text-center leading-none">Board Game</span>
              {dateData.activity === 'Board Game' && <span className="text-[#22c55e] text-sm mt-1 font-bold">(Đã chọn)</span>}
            </button>
            {/* 5. Surprise Me */}
            <button onClick={() => handleActivitySelect('Surprise Me')} className={`flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 h-32 ${dateData.activity === 'Surprise Me' ? 'bg-pink-100 ring-2 ring-[#22c55e]' : ''}`}>
              <span className="text-4xl mb-2">🎁</span><span className="text-[#ff4d88] text-xl font-bold uppercase text-center leading-none">Surprise Me</span>
            </button>
            {/* 6. Custom Request (Yêu cầu riêng) */}
            <button onClick={() => handleActivitySelect('Custom Request')} className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 h-32">
              <span className="text-4xl mb-2">✍️</span><span className="text-[#ff4d88] text-xl font-bold uppercase text-center leading-none">Your Rules!</span>
              {customRequest && <span className="text-[#22c55e] text-sm mt-1">(Added)</span>}
            </button>
          </div>

          {/* Nút CHỐT PLAN chuyển sang trang Confirm */}
          <button onClick={handleGoToConfirm} className="mt-10 w-[90%] md:w-3/4 h-16 bg-[#22c55e] text-white text-3xl font-bold border-4 border-[#166534] rounded shadow-[4px_4px_0_0_#166534] transition-transform hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-2">
            Xong Rồi ! <span>🎉</span>
          </button>
        </div>
      )}
      {/* --- TRANG 5: CHỌN MÓN ĂN (FOOD TOUR) --- */}
      {step === 5 && (
        <div className="flex flex-col items-center w-full max-w-4xl px-4 z-10 animate-fade-in h-[95vh] py-6">
          
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight shrink-0">
            Food Menu
          </h1>
          <p className="text-white text-xl md:text-2xl mb-6 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center shrink-0">
            Pick whatever you are craving! (Can pick multiple)
          </p>

          {/* Vùng chứa các món ăn (Có thể scroll nếu nhiều món) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full overflow-y-auto pb-4 px-2 custom-scrollbar flex-grow content-start">
            {foodOptions.map((food) => {
              // Kiểm tra xem món này đã được chọn chưa
              const isSelected = selectedFoods.includes(food.name);
              
              return (
                <div 
                  key={food.id}
                  onClick={() => toggleFood(food.name)}
                  // Nếu được chọn: Viền xanh, nền hồng nhạt, bóng xanh. Không chọn: Viền hồng, nền trắng.
                  className={`relative flex flex-col items-center justify-between p-2 border-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 h-40 md:h-48 ${
                    isSelected 
                      ? 'bg-[#ffe4e1] border-[#22c55e] shadow-[4px_4px_0_0_#22c55e]' 
                      : 'bg-white border-[#ff4d88] shadow-[4px_4px_0_0_#ff4d88]'
                  }`}
                >
                  {/* Dấu Tích Xanh (hiện ra khi chọn) */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-[#22c55e] text-3xl font-bold drop-shadow-md z-10">
                      ✓
                    </div>
                  )}
                  
                  {/* Khung chứa ảnh/emoji */}
                  <div className="w-full h-24 md:h-32 bg-gray-50 rounded flex items-center justify-center text-5xl mb-2 overflow-hidden border-2 border-dashed border-gray-200 relative">
                     {/* Nếu có ảnh sẽ hiện ảnh (lấp đầy khung), nếu ảnh lỗi hoặc chưa có sẽ hiện emoji */}
                     <img 
                       src={food.image} 
                       alt={food.name} 
                       className="absolute inset-0 w-full h-full object-cover z-0"
                       // Mẹo: Dùng onError để ẩn ảnh đi nếu file ảnh không tồn tại, lộ ra emoji bên dưới
                       onError={(e) => e.target.style.display = 'none'} 
                     />
                     <span className="z-0 opacity-50">{food.emoji}</span>
                  </div>
                  
                  {/* Tên món */}
                  <span className="text-[#ff4d88] text-lg md:text-xl font-bold text-center leading-tight">
                    {food.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Nút Continue */}
          <button 
            onClick={handleFoodSubmit}
            className="mt-6 w-[80%] md:w-1/2 h-14 shrink-0 bg-white text-[#ff4d88] text-2xl font-bold border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-2"
          >
            Continue <span>→</span>
          </button>
        </div>
      )}
      {/* --- [THÊM MỚI] TRANG 6: CHỌN WORKSHOP (ART WORKSHOP) --- */}
      {step === 6 && (
        <div className="flex flex-col items-center w-full max-w-4xl px-4 z-10 animate-fade-in h-[95vh] py-6">
          
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight shrink-0">
            Workshop Menu
          </h1>
          <p className="text-white text-xl md:text-2xl mb-6 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center shrink-0">
            Pick creativity! (Can pick multiple)
          </p>

          {/* Vùng chứa các workshop (Có thể scroll, chung style với Food Menu) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full overflow-y-auto pb-4 px-2 custom-scrollbar flex-grow content-start">
            {workshopOptions.map((ws) => {
              const isSelected = selectedWorkshops.includes(ws.name);
              
              return (
                <div 
                  key={ws.id}
                  onClick={() => toggleWorkshop(ws.name)}
                  className={`relative flex flex-col items-center justify-between p-2 border-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 h-40 md:h-48 ${
                    isSelected 
                      ? 'bg-[#ffe4e1] border-[#22c55e] shadow-[4px_4px_0_0_#22c55e]' 
                      : 'bg-white border-[#ff4d88] shadow-[4px_4px_0_0_#ff4d88]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-[#22c55e] text-3xl font-bold drop-shadow-md z-10">
                      ✓
                    </div>
                  )}
                  
                  <div className="w-full h-24 md:h-32 bg-gray-50 rounded flex items-center justify-center text-5xl mb-2 overflow-hidden border-2 border-dashed border-gray-200 relative">
                     <img 
                       src={ws.image} 
                       alt={ws.name} 
                       className="absolute inset-0 w-full h-full object-cover z-0"
                       onError={(e) => e.target.style.display = 'none'} 
                     />
                     <span className="z-0 opacity-50">{ws.emoji}</span>
                  </div>
                  
                  <span className="text-[#ff4d88] text-lg md:text-xl font-bold text-center leading-tight">
                    {ws.name}
                  </span>
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleWorkshopSubmit}
            className="mt-6 w-[80%] md:w-1/2 h-14 shrink-0 bg-white text-[#ff4d88] text-2xl font-bold border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-2"
          >
            Continue <span>→</span>
          </button>
        </div>
      )}
      {/* --- TRANG 8: CHỌN PHIM (MOVIE NIGHT) --- */}
      {step === 8 && (
        <div className="flex flex-col items-center w-full max-w-4xl px-4 z-10 animate-fade-in h-[95vh] py-6 pt-16">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight shrink-0">
            Movie Selection
          </h1>
          <p className="text-white text-xl md:text-2xl mb-6 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center shrink-0">
            What are we watching?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full overflow-y-auto pb-4 px-2 custom-scrollbar flex-grow content-start">
            {movieOptions.map((mv) => {
              const isSelected = selectedMovies.includes(mv.name);
              return (
                <div 
                  key={mv.id} 
                  onClick={() => toggleMovie(mv.name)} 
                  className={`relative flex flex-col items-center justify-between p-2 border-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 h-40 md:h-48 ${isSelected ? 'bg-[#ffe4e1] border-[#22c55e] shadow-[4px_4px_0_0_#22c55e]' : 'bg-white border-[#ff4d88] shadow-[4px_4px_0_0_#ff4d88]'}`}
                >
                  {isSelected && <div className="absolute top-2 right-2 text-[#22c55e] text-3xl font-bold drop-shadow-md z-10">✓</div>}
                  <div className="w-full h-24 md:h-32 bg-gray-50 rounded flex items-center justify-center text-5xl mb-2 overflow-hidden border-2 border-dashed border-gray-200 relative">
                     <img src={mv.image} alt={mv.name} className="absolute inset-0 w-full h-full object-cover z-0" onError={(e) => e.target.style.display = 'none'} />
                     <span className="z-0 opacity-50">{mv.emoji}</span>
                  </div>
                  <span className="text-[#ff4d88] text-lg md:text-xl font-bold text-center leading-tight">{mv.name}</span>
                </div>
              );
            })}
          </div>
          <button onClick={handleMovieSubmit} className="mt-6 w-[80%] md:w-1/2 h-14 shrink-0 bg-white text-[#ff4d88] text-2xl font-bold border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-2">
            Continue <span>→</span>
          </button>
        </div>
      )}
      {/* --- TRANG 9: YÊU CẦU RIÊNG --- */}
      {step === 9 && (
        <div className="flex flex-col items-center w-full max-w-2xl px-4 z-10 animate-fade-in py-6 pt-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase">
            Your Rules!
          </h1>
          <p className="text-white text-xl md:text-2xl mb-6 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center">
            Cậu có lưu ý gì cho tớ khum!
          </p>
          <textarea
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            placeholder="..."
            className="w-full h-40 p-4 text-xl md:text-2xl text-[#ff4d88] border-4 border-[#ff4d88] rounded-xl shadow-[4px_4px_0_0_#ff4d88] outline-none resize-none font-['VT323']"
          />
          <button onClick={handleCustomSubmit} className="mt-6 w-[80%] md:w-1/2 h-14 bg-white text-[#ff4d88] text-2xl font-bold border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform hover:scale-105 cursor-pointer uppercase">
            Lưu Lại <span>→</span>
          </button>
        </div>
      )}
      {/* --- TRANG 7: TỔNG KẾT & CONFIRM --- */}
      {step === 7 && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 z-10 animate-fade-in gap-6 pb-10 pt-16">
          <div className="bg-[#e0f7fa] p-2 rounded-lg border-4 border-[#ff7eb3] shadow-[4px_4px_0_0_#ff4d88]">
            <img src="/cute-bear3.gif" alt="Cute Bears Celebrate" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded" />
          </div>

          {/* KIỂM TRA NẾU LÀ SURPRISE ME THÌ HIỆN BẢNG KHÁC */}
          {dateData.activity === 'Surprise Me' ? (
            <>
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight">
                OH WOW! 🎁
              </h1>
              <div className="w-full bg-white border-4 border-[#ff4d88] rounded-xl p-8 shadow-[6px_6px_0_0_#ff4d88] text-center space-y-4 relative z-20">
                <p className="text-[#ff4d88] text-3xl md:text-4xl font-bold">
                  Cậu tin tưởng tớ đến thế sao? 🥺💖
                </p>
                <p className="text-gray-500 text-xl font-bold mt-2">
                  (Mọi lịch trình cứ để tớ lo nhé!)
                </p>
                
                {/* HIỆN YÊU CẦU RIÊNG NẾU CÓ */}
                {customRequest && (
                  <div className="mt-6 p-4 bg-pink-50 border-2 border-dashed border-[#ff4d88] rounded-lg">
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">Note:</p>
                    <p className="text-[#ff4d88] text-xl font-bold italic">"{customRequest}"</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            // NẾU KHÔNG PHẢI SURPRISE ME THÌ HIỆN BẢNG TỔNG KẾT BÌNH THƯỜNG
            <>
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight">
                YAY! IT'S SET!
              </h1>
              <div className="w-full bg-white border-4 border-[#ff4d88] rounded-xl p-6 shadow-[6px_6px_0_0_#ff4d88] text-left space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar relative z-20">
                
                <div className="flex items-center gap-3 border-b-2 border-dashed border-gray-100 pb-2">
                  <span className="text-4xl">📅</span>
                  <div>
                    <p className="text-gray-400 text-sm uppercase font-bold leading-none">Date</p>
                    <p className="text-[#ff4d88] text-2xl font-bold">{dateData.date}</p>
                  </div>
                </div>

                {selectedFoods.length > 0 && (
                  <div className="flex flex-col gap-1 border-b-2 border-dashed border-gray-100 pb-2">
                    <p className="text-gray-400 text-sm uppercase font-bold">🍜 Food Tour</p>
                    <p className="text-[#ff4d88] text-xl font-bold">{selectedFoods.join(" • ")}</p>
                  </div>
                )}

                {selectedMovies.length > 0 && (
                  <div className="flex flex-col gap-1 border-b-2 border-dashed border-gray-100 pb-2">
                    <p className="text-gray-400 text-sm uppercase font-bold">🍿 Movies</p>
                    <p className="text-[#ff4d88] text-xl font-bold">{selectedMovies.join(" • ")}</p>
                  </div>
                )}

                {selectedWorkshops.length > 0 && (
                  <div className="flex flex-col gap-1 border-b-2 border-dashed border-gray-100 pb-2">
                    <p className="text-gray-400 text-sm uppercase font-bold">🎨 Workshop</p>
                    <p className="text-[#ff4d88] text-xl font-bold">{selectedWorkshops.join(" • ")}</p>
                  </div>
                )}

                {dateData.activity === 'Board Game' && (
                  <div className="flex flex-col gap-1 border-b-2 border-dashed border-gray-100 pb-2">
                    <p className="text-gray-400 text-sm uppercase font-bold">🎲 Other Activity</p>
                    <p className="text-[#ff4d88] text-xl font-bold uppercase">{dateData.activity}</p>
                  </div>
                )}

                {customRequest && (
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400 text-sm uppercase font-bold">✍️ Your Rules</p>
                    <p className="text-[#ff4d88] text-xl font-bold break-words">{customRequest}</p>
                  </div>
                )}
              </div>
              <p className="text-white text-2xl tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center mt-4 z-20">
                Everything looks perfect! Ready to send?
              </p>
            </>
          )}

          {/* Nút gửi lời mời cuối cùng dùng chung cho cả 2 trường hợp */}
          <button 
            onClick={handleFinalSend}
            className="w-[90%] md:w-3/4 h-16 bg-[#22c55e] text-white text-3xl font-bold border-4 border-[#166534] rounded shadow-[4px_4px_0_0_#166534] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-3 mt-4 z-20 relative"
          >
            Send Invitation <span>💌</span>
          </button>
        </div>
      )}
      {/* --- CUSTOM POPUP THÔNG BÁO --- */}
      {popup.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white border-4 border-[#ff4d88] rounded-xl p-6 md:p-8 shadow-[6px_6px_0_0_#ff4d88] text-center max-w-[80%] md:max-w-sm animate-fade-in flex flex-col items-center">
            <span className="text-5xl mb-4">🔔</span>
            <p className="text-[#ff4d88] text-2xl md:text-3xl font-bold mb-6 leading-tight">
              {popup.message}
            </p>
            <button 
              onClick={closePopup}
              className="bg-[#ffe4e1] text-[#ff4d88] px-8 py-2 border-4 border-[#ff4d88] rounded font-bold text-2xl hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all shadow-[3px_3px_0_0_#ff4d88] cursor-pointer uppercase"
            >
              OK !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;