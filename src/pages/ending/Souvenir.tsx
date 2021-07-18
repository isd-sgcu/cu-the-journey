import { useRouter } from "solid-app-router";

function Souvenir() {
  const [router] = useRouter();
  const number = router.query.number as string;
  if (!number) {
    return (
      <>
        <h4>ไม่เลือกหมายเลข</h4>
      </>
    );
  }
  return (
    <>
      <h2>Your New Journey Begins</h2>
      <h4 class="mt-3.5 mb-2">หมายเลข {number}</h4>

      <p class="mb-40">“ (คำทำนาย) “</p>

      <h6>การเดินทางครั้งใหม่นี้</h6>
      <h6>ขอให้เธอปล่อยตัวเองให้เป็นอิสระ</h6>
      <h6>เลือกที่จะใช้ชีวิตตามเส้นทางของเธอ</h6>
      <h6>แล้วเป็นตัวเธออย่างแท้จริง</h6>
      <h6 class="mt-4">ใช้ช่วงเวลาต่อจากนี้ให้คุ้มค่า เหมือนที่ผ่านมานะ</h6>
      <h6>- Free your mind, Find your way -</h6>
      <p class="mt-4">อย่าลืม แอดไลน์ เพื่อติดตามข่าวสารต่าง ๆ จากอบจ.</p>
      <p class="text-right">QR Line Official</p>
    </>
  );
}

export default Souvenir;
