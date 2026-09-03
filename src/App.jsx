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
  // Ô đặc biệt: Random
  { id: 'f14', name: '???', image: '/random.jpg', emoji: '🤫' },
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

  // Hàm xử lý chọn hoạt động ở Trang 4
  const handleActivitySelect = (act) => {
    setDateData({ ...dateData, activity: act });
    
    if (act === 'Food Tour') {
      setStep(5);
    } else if (act === 'Art Workshop') {
      setStep(6);
    } else if (act === 'Movie Night') {
      setStep(8);
    } else {
      setStep(7);
    }
  };

  const handleBack = () => {
    // Nếu đang ở trang chọn phim (step 8), món ăn (step 5), hoặc workshop (step 6)
    // thì quay về trang 4 (chọn hoạt động)
    if (step === 5 || step === 6 || step === 8) {
      setStep(4);
    } 
    // Nếu đang ở trang Confirm (step 7)
    else if (step === 7) {
      setStep(4);
      // Xóa dữ liệu cũ khi quay lại từ trang cuối
      setDateData({ ...dateData, extras: [] });
      setSelectedFoods([]);
      setSelectedWorkshops([]);
      setSelectedMovies([]);
    } 
    // Các trang còn lại (như từ trang 4 về trang 3) thì lùi 1 bước bình thường
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

  const handleMovieSubmit = () => {
    if (selectedMovies.length === 0) {
      alert("Chọn ít nhất 1 phim hoặc chọn '???' đi nè! 🍿");
      return;
    }
    setDateData({ ...dateData, extras: selectedMovies });
    setStep(7); 
  };
  // --- [THÊM MỚI] Hàm bấm Continue ở màn hình Art Workshop ---
  const handleWorkshopSubmit = () => {
    if (selectedWorkshops.length === 0) {
      alert("Chọn ít nhất 1 cái hoặc '???' đi mà! 🥺");
      return;
    }
    // Lưu các workshop đã chọn vào dateData.extras
    setDateData({ ...dateData, extras: selectedWorkshops });
    setStep(7); // Chuyển đến trang Confirm (Trang 7)
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

  // Hàm bấm Continue ở màn hình Food Tour
  const handleFoodSubmit = () => {
    if (selectedFoods.length === 0) {
      triggerPopup("Chọn ít nhất 1 món hoặc chọn '???' đi nè! 🤤");
      return;
    }
    setDateData({ ...dateData, extras: selectedFoods });
    setStep(7); 
  };
  // --- HÀM GỬI DỮ LIỆU ĐẾN DISCORD WEBHOOK ---
  const handleFinalSend = async () => {
    // Dán URL Webhook Discord của bạn vào đây
    const webhookUrl = "https://discord.com/api/webhooks/1543983290254626816/jtar3sMHG2Y7A72ewO81Af9oAf6ngATntAGCBbNJdowK-hbuZSr7CxDuwFZS5OOE1q8F"; 

    // Định dạng nội dung tin nhắn gửi đi
    const message = {
      content: "🎉 **CÓ LỜI MỜI HẸN HÒ MỚI ĐƯỢC CHẤP NHẬN!** 🎉",
      embeds: [
        {
          title: "💌 Date Invitation Details",
          color: 0xff4d88, // Màu hồng chủ đạo
          fields: [
            {
              name: "📅 Ngày hẹn (Date)",
              value: dateData.date || "Chưa chọn",
              inline: false
            },
            {
              name: "🎯 Hoạt động (Activity)",
              value: dateData.activity.toUpperCase() || "Chưa chọn",
              inline: false
            },
            {
              name: "🛍️ Chi tiết lựa chọn (Details)",
              value: dateData.extras.length > 0 ? dateData.extras.join(", ") : "Không có",
              inline: false
            }
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
          className="absolute top-4 left-4 md:top-8 md:left-8 bg-white text-[#ff4d88] text-xl font-bold px-4 py-2 border-4 border-[#ff4d88] rounded shadow-[3px_3px_0_0_#ff4d88] transition-transform duration-200 hover:bg-pink-50 hover:scale-105 active:scale-95 z-50 flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> Back
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

      {/* --- TRANG 4: WHAT WOULD YOU LIKE TO DO? --- */}
      {step === 4 && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 z-10 animate-fade-in">
          
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight">
            What would you<br/>like to do?
          </h1>
          <p className="text-white text-xl md:text-2xl mb-8 tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center">
            Pick one of the options below
          </p>

          {/* Lưới 4 lựa chọn */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
            
            {/* 1. Food Tour */}
            <button 
              onClick={() => handleActivitySelect('Food Tour')}
              className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 hover:bg-pink-50 cursor-pointer h-32 md:h-40"
            >
              <span className="text-4xl md:text-5xl mb-2">🛵</span>
              <span className="text-[#ff4d88] text-2xl md:text-3xl font-bold uppercase text-center leading-none">Food Tour</span>
            </button>

            {/* 2. Art Workshop (Thay Movie) */}
            <button 
              onClick={() => handleActivitySelect('Art Workshop')}
              className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 hover:bg-pink-50 cursor-pointer h-32 md:h-40"
            >
              <span className="text-4xl md:text-5xl mb-2">🎨</span>
              <span className="text-[#ff4d88] text-2xl md:text-3xl font-bold uppercase text-center leading-none">Workshop</span>
            </button>

            {/* 3. Board Game (Thay Coffee trơn) */}
            <button 
              onClick={() => handleActivitySelect('Board Game')}
              className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 hover:bg-pink-50 cursor-pointer h-32 md:h-40"
            >
              <span className="text-4xl md:text-5xl mb-2">🎲</span>
              <span className="text-[#ff4d88] text-2xl md:text-3xl font-bold uppercase text-center leading-none">Board Game</span>
            </button>
            {/* Thêm mục Movie Night */}
            <button 
              onClick={() => handleActivitySelect('Movie Night')}
              className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 hover:bg-pink-50 cursor-pointer h-32 md:h-40"
            >
              <span className="text-4xl md:text-5xl mb-2">🍿</span>
              <span className="text-[#ff4d88] text-2xl md:text-3xl font-bold uppercase text-center leading-none">Movie Night</span>
            </button>

            {/* 4. Surprise Me */}
            <button 
              onClick={() => handleActivitySelect('Surprise Me')}
              className="flex flex-col items-center justify-center p-4 bg-white border-4 border-[#ff4d88] rounded shadow-[4px_4px_0_0_#ff4d88] transition-transform duration-200 hover:scale-105 hover:bg-pink-50 cursor-pointer h-32 md:h-40"
            >
              <span className="text-4xl md:text-5xl mb-2">🎁</span>
              <span className="text-[#ff4d88] text-2xl md:text-3xl font-bold uppercase text-center leading-none">Surprise Me</span>
            </button>
          </div>
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
      {/* --- TRANG 7: TỔNG KẾT & CONFIRM --- */}
      {step === 7 && (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 z-10 animate-fade-in gap-6 pb-10">
          
          <div className="bg-[#e0f7fa] p-2 rounded-lg border-4 border-[#ff7eb3] shadow-[4px_4px_0_0_#ff4d88]">
            <img src="/cute-bear3.gif" alt="Cute Bears Celebrate" className="w-24 h-24 md:w-32 md:h-32 object-cover rounded" />
          </div>

          <h1 className="text-white text-5xl md:text-6xl font-bold mb-2 tracking-widest drop-shadow-[3px_3px_0_#ff4d88] text-center uppercase leading-tight">
            YAY! IT'S SET!
          </h1>
          
          {/* Bảng tổng kết plan */}
          <div className="w-full bg-white border-4 border-[#ff4d88] rounded-xl p-6 shadow-[6px_6px_0_0_#ff4d88] text-left space-y-4">
            
            <div className="flex items-center gap-3">
              <span className="text-4xl">📅</span>
              <div>
                <p className="text-gray-400 text-sm uppercase font-bold leading-none">Date</p>
                <p className="text-[#ff4d88] text-2xl md:text-3xl font-bold">{dateData.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {dateData.activity === 'Food Tour' && '🛵'}
                {dateData.activity === 'Art Workshop' && '🎨'}
                {dateData.activity === 'Movie Night' && '🍿'}
                {dateData.activity === 'Board Game' && '🎲'}
                {dateData.activity === 'Surprise Me' && '🎁'}
              </span>
              <div>
                <p className="text-gray-400 text-sm uppercase font-bold leading-none">Activity</p>
                <p className="text-[#ff4d88] text-2xl md:text-3xl font-bold uppercase">{dateData.activity}</p>
              </div>
            </div>

            {(dateData.activity === 'Food Tour' || dateData.activity === 'Art Workshop' || dateData.activity === 'Movie Night') && (
              <div className="flex items-start gap-3 border-t-2 border-dashed border-gray-100 pt-4">
                <span className="text-4xl">
                    {dateData.activity === 'Food Tour' ? '🍜' : (dateData.activity === 'Movie Night' ? '🎬' : '🖌️')}
                </span>
                <div className="flex-grow">
                  <p className="text-gray-400 text-sm uppercase font-bold leading-none">Details</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dateData.extras.map((item, index) => (
                      <span 
                        key={index} 
                        className="bg-pink-100 text-[#ff4d88] font-bold px-3 py-1 rounded-full border border-pink-200 text-sm md:text-base shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-white text-2xl tracking-wide drop-shadow-[1px_1px_0_#ff4d88] text-center mt-4">
            Everything looks perfect! Ready to send?
          </p>

          {/* Nút gửi lời mời cuối cùng - ĐÃ GẮN HÀM handleFinalSend */}
          <button 
            onClick={handleFinalSend}
            className="w-[90%] md:w-3/4 h-16 bg-[#22c55e] text-white text-3xl font-bold border-4 border-[#166534] rounded shadow-[4px_4px_0_0_#166534] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer uppercase flex justify-center items-center gap-3 mt-4"
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