# 📘 ระบบแบบทดสอบทบทวน Midterm (100 ข้อ) - วิชาสื่อสารข้อมูลและเครือข่าย (COM2703)

เว็บแอปพลิเคชันแบบทดสอบโต้ตอบ (Interactive Quiz App) และคลังข้อสอบ 100 ข้อ พร้อมเฉลยละเอียดและรูปภาพประกอบการแปลงสัญญาณ สำหรับทบทวนเตรียมสอบ Midterm วิชา COM2703 (สื่อสารข้อมูลและเครือข่าย)

---

## 🌟 ฟีเจอร์หลัก (Features)

- 📚 **คลังข้อสอบ 100 ข้อ ครอบคลุม 4 บทเรียน:**
  - **บทที่ 1:** พื้นฐานการสื่อสาร & การคำนวณ Bandwidth, Baud rate, Bit rate (15 ข้อ)
  - **บทที่ 2:** สื่อกลางการส่งข้อมูล UTP/STP, Coaxial, Fiber Optic, สัญญาณไร้สาย FHSS/DSSS, IEEE 802.11/802.3, CAT5e/CAT6 (25 ข้อ)
  - **บทที่ 3:** OSI 7 Layers, Encapsulation, MUX (FDM, TDM, STDM, WDM), อุปกรณ์เครือข่าย Hub, Switch, Router, Gateway, PoE, FEP (30 ข้อ)
  - **บทที่ 4:** การมอดูเลต (ASK/FSK/PSK, AM/FM/PM, PAM/PWM/PPM/PCM, QAM), Line Coding (Unipolar/Polar/Bipolar), สีสาย LAN EIA/TIA 568B, คำสั่ง Command Line, สัญญาณรบกวน, Error Detection VRC/LRC/CRC และ Hamming Code (30 ข้อ)

- 💡 **Practice Mode:** ทำข้อสอบทีละข้อ เลือกตอบแล้วรู้ผลทันที พร้อมคำอธิบายเฉลยอย่างละเอียดและรูปภาพประกอบ
- ⏱️ **Exam Mode:** จับเวลาจำลองการสอบ ส่งข้อสอบแล้วคิดคะแนนสุทธิ % แสดงผลวิเคราะห์ข้อถูก/ผิด/ไม่ได้ทำ
- 📱 **Cross-Platform Responsive Design:** รองรับทุกอุปกรณ์ (Smartphones, Tablets, Laptops, Desktops, iOS, Android, Windows)
- 👆 **Touch Swipe Support:** ใช้นิ้วปัดหน้าจอ ซ้าย/ขวา เพื่อเปลี่ยนข้อสอบบนมือถือ
- ⚡ **Vector SVG Signal Wave Generator:** แสดงแผนภูมิรูปคลื่นสัญญาณดิจิทัล/อนาล็อกความละเอียดสูง
- 🔖 **Bookmark & Grid Navigator:** ปักหมุดข้อที่สงสัย และกดสลับไปข้อที่ต้องการได้ทันที

---

## 📁 โครงสร้างไฟล์ในโครงการ (Project Structure)

```text
quiz_app/
├── index.html                  # โครงสร้างหน้าเว็บหลัก
├── styles.css                  # สไตล์ responsive (Dark/Light mode, Mobile-first)
├── app.js                      # ระบบประมวลผลคำตอบ Touch Swipe และ SVG Wave Generator
├── questions.js                # ฐานข้อมูลข้อสอบ 100 ข้อ
├── midterm_review_exam_100.md  # เอกสารข้อสอบฉบับเต็ม 100 ข้อ (เปิดดูเฉลยได้)
├── media/                      # รูปภาพประกอบการมอดูเลต สาย LAN และ Hamming Code
│   ├── image1.png ~ image17.png
└── README.md                   # เอกสารแนะนำโครงการ
```

---

## 🚀 วิธีใช้งานเปิดเล่นบนเว็บผ่าน GitHub Pages (ฟรี!)

หากต้องการให้เพื่อนๆ เปิดเล่นผ่านลิงก์เว็บได้ทันที สามารถเปิดใช้งาน **GitHub Pages** ได้ดังนี้:

1. Push โฟลเดอร์ `quiz_app` นี้ขึ้น GitHub Repository
2. ไปที่เมนู **Settings** ของ Repository บน GitHub
3. เลือกหัวข้อ **Pages** ด้านซ้ายมือ
4. ในส่วน **Build and deployment -> Branch** ให้เลือก branch `main` (หรือ `master`) แล้วกด **Save**
5. รอ 1-2 นาที GitHub จะสร้างลิงก์เว็บไซต์ให้ เช่น `https://username.github.io/repository-name/`
