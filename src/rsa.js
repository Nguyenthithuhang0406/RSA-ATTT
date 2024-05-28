/* eslint-disable */

class RSA {
  constructor() {
    this.TaoKhoa();
  }

  KiemTraNguyenTo(i) {
    if (i < 2) return false;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) return false;
    }
    return true;
  }

  TaoKhoa() {
    const rd = () => Math.floor(Math.random() * (101 - 11) + 11);
    do {
      this.p = rd();
    } while (!this.KiemTraNguyenTo(this.p));

    do {
      this.q = rd();
    } while (!this.KiemTraNguyenTo(this.q));

    this.n = this.p * this.q;

    do {
      this.e = Math.floor(Math.random() * (100 - 2) + 2);
    } while (!this.KiemTraNguyenTo(this.e) || !this.NguyenToCungNhau(this.e, (this.p - 1) * (this.q - 1)));

    let k = 1;
    while (true) {
      if ((k * (this.p - 1) * (this.q - 1) + 1) % this.e === 0) {
        this.d = (k * (this.p - 1) * (this.q - 1) + 1) / this.e;
        break;
      }
      k++;
    }
  }

  NguyenToCungNhau(a, b) {
    const GCD = (x, y) => {
      while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
      }
      return x;
    };
    return GCD(a, b) === 1;
  }

  Mod(m, e, n) {
    let kq = 1;
    m = m % n;
    while (e > 0) {
      if (e % 2 === 1) {
        kq = (kq * m) % n;
      }
      e = e >> 1;
      m = (m * m) % n;
    }
    return kq;
  }

  MaHoa(s) {
    const nguyen = Array.from(s).map(c => c.charCodeAt(0));
    const a = nguyen.map(n => this.Mod(n, this.e, this.n));
    const str = String.fromCharCode(...a);
    return btoa(unescape(encodeURIComponent(str)));
  }

  GiaiMa(s) {
    const giaima = decodeURIComponent(escape(atob(s)));
    const b = Array.from(giaima).map(c => c.charCodeAt(0));
    const c = b.map(n => this.Mod(n, this.d, this.n));
    return String.fromCharCode(...c);
  }
}

import CryptoJs from 'crypto-js';
function ComputeMd5Hash(input) {
  
  return CryptoJs.MD5(input).toString(CryptoJs.enc.Hex);
}

export { RSA, ComputeMd5Hash };
