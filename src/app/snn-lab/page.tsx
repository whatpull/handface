// SNN Lab — LocalSNN end-to-end 데모.
// 백엔드 round-trip 없이 브라우저 안에서 회로 빌드 + STDP + localStorage 영속화 검증.

import SnnLabClient from '@/components/snn-lab/SnnLabClient';

export default function SnnLabPage() {
  return <SnnLabClient />;
}
