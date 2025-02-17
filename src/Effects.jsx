import { EffectComposer, BrightnessContrast, Autofocus } from '@react-three/postprocessing';

export function Effects() {
  return (
    <EffectComposer disableNormalPass multisampling={4}>
        <BrightnessContrast brightness={-0.1} />
        <Autofocus />
    </EffectComposer>
  );
}
