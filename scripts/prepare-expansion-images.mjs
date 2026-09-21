import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.env.SHARP_MODULE || 'sharp');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=process.argv[2];
if(!source) throw new Error('Pass the directory containing the preserved generated PNG originals.');
const mapping={
  'rinpa':'exec-600cb829-2f81-43a0-a0be-0707cdf47561.png',
  'blue-white-porcelain':'exec-486b3b7d-5526-4424-a38d-d5b5e69a4d6e.png',
  'chinese-paper-cut':'exec-d28a2b82-14ed-496a-b5c9-2ca5c9b96168.png',
  'song-bird-flower':'exec-a3ca67b3-9ecf-48d6-affe-58af1d8e64bd.png',
  'arts-and-crafts':'exec-c02f88ba-6d2c-4de3-a4e7-cacbc8b19970.png',
  'mid-century-modern':'exec-ff11795e-d071-4243-bc2e-f5cf0855bea5.png',
  'vienna-secession':'exec-bc65a288-b768-4d94-a4de-a5ecbb805e10.png',
  'sachplakat':'exec-1326365a-a52a-4fd2-9be2-22cd7772b4e9.png',
  'risograph':'exec-f90b4ce6-1a2d-4870-9e54-aec4ae6605ec.png',
  'cyanotype':'exec-9ef93b99-b965-40ff-9153-ff528713fc28.png',
  'linocut':'exec-fe4359ba-36a2-421d-a3cb-4cd739e6608e.png',
  'paper-collage':'exec-54d57335-f213-429f-9516-4306b377ad5a.png'
};
for(const [id,file] of Object.entries(mapping)) {
  const input=path.join(source,file);
  const metadata=await sharp(input).metadata();
  if(!metadata.width || metadata.height<metadata.width) throw new Error(`Expected portrait: ${id}`);
  await sharp(input).resize({width:1200,height:2000,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toFile(path.join(root,`assets/styles/${id}.webp`));
  await sharp(input).resize(360,480,{fit:'cover'}).jpeg({quality:85}).toFile(path.join(root,`iOS/StyleAtlas/Widgets/Resources/Thumbnails/${id}.jpg`));
  console.log(`${id}: ${metadata.width}x${metadata.height} -> WebP + widget JPEG`);
}
