window.onload = function() {
    const flightPath = document.getElementById('flightPath');
    const airplane = document.getElementById('airplane');

    // Lấy độ dài chính xác của đường dẫn SVG
    const pathLength = flightPath.getTotalLength();

    // Cập nhật CSS của path và máy bay với độ dài chính xác
    flightPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    flightPath.style.strokeDashoffset = pathLength; // Bắt đầu ở độ dài đầy đủ (ẩn)

    // Trigger lại hoạt ảnh cho đường bay (vẽ xong rồi bay)
    flightPath.style.animation = 'none';
    flightPath.offsetHeight; /* Trigger reflow */
    flightPath.style.animation = 'drawLine 2s forwards ease-out';

    // Đặt delay cho máy bay để nó bay sau khi đường bay được vẽ
    airplane.style.display = 'block'; // Hiển thị máy bay
    airplane.style.animationDelay = '1s'; // Delay để bắt đầu sau hoạt ảnh vẽ
};