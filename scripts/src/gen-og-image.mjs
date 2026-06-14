import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

const fontDir = '/tmp/noto_ttf';
const subsets = readdirSync(fontDir).filter(f => f.endsWith('.ttf'));
for (const f of subsets) {
  GlobalFonts.registerFromPath(`${fontDir}/${f}`, 'NotoKR');
}
console.log(`Registered ${subsets.length} TTF font subsets`);

const W = 1200, H = 630;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

const bg = await loadImage(resolve(root, 'artifacts/axstudio/public/seunggyeongdo-board.jpg'));

const scale = Math.max(W / bg.width, H / bg.height);
const bw = bg.width * scale, bh = bg.height * scale;
ctx.drawImage(bg, (W - bw) / 2, (H - bh) / 2, bw, bh);

// Dark sepia overlay
ctx.fillStyle = 'rgba(12, 8, 3, 0.65)';
ctx.fillRect(0, 0, W, H);

// Gold outer border
ctx.strokeStyle = 'rgba(201,154,69,0.5)';
ctx.lineWidth = 3;
ctx.strokeRect(28, 28, W - 56, H - 56);
ctx.strokeStyle = 'rgba(201,154,69,0.22)';
ctx.lineWidth = 1;
ctx.strokeRect(38, 38, W - 76, H - 76);

// Studio label
ctx.font = 'bold 20px NotoKR';
ctx.fillStyle = 'rgba(201,154,69,0.85)';
ctx.textAlign = 'center';
ctx.fillText('AXE STUDIO', W / 2, 92);

// Top divider
ctx.strokeStyle = 'rgba(201,154,69,0.45)';
ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(W / 2 - 90, 108); ctx.lineTo(W / 2 + 90, 108); ctx.stroke();

// Main title
ctx.font = 'bold 112px NotoKR';
ctx.fillStyle = '#f5e6c0';
ctx.textAlign = 'center';
ctx.shadowColor = 'rgba(0,0,0,0.9)';
ctx.shadowBlur = 20;
ctx.fillText('승경아 놀자', W / 2, 300);
ctx.shadowBlur = 0;

// Subtitle line 1
ctx.font = 'bold 26px NotoKR';
ctx.fillStyle = 'rgba(255, 240, 200, 0.88)';
ctx.fillText('조선시대 실존 전통 놀이 원작', W / 2, 370);

// Subtitle line 2
ctx.font = '22px NotoKR';
ctx.fillStyle = 'rgba(255, 240, 200, 0.62)';
ctx.fillText('온 가족 역사 판타지 타임슬립 드라마', W / 2, 408);

// Bottom divider
ctx.strokeStyle = 'rgba(201,154,69,0.4)';
ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(W / 2 - 140, 468); ctx.lineTo(W / 2 + 140, 468); ctx.stroke();

// Bottom tag
ctx.font = '17px NotoKR';
ctx.fillStyle = 'rgba(201,154,69,0.65)';
ctx.fillText('오디션 모집 중  ·  협찬 파트너 모집 중', W / 2, 498);

const out = resolve(root, 'artifacts/axstudio/public/og-image.jpg');
writeFileSync(out, canvas.toBuffer('image/jpeg', { quality: 93 }));
console.log('✓ og-image.jpg written', readFileSync(out).length, 'bytes');
