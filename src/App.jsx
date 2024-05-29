/* eslint-disable */
import React, { useState } from 'react';

import { RSA, ComputeMd5Hash } from './rsa';

import "./App.scss"
const App = () => {
  const [rsa] = useState(new RSA());
  const [textToSign, setTextToSign] = useState('');
  const [signedText, setSignedText] = useState('');
  const [hashFunction, setHashFunction] = useState('');
  const [signature, setSignature] = useState('');
  const [verificationText, setVerificationText] = useState('');
  const [verificationSignature, setVerificationSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [notification, setNotification] = useState('')

  const handleSign = () => {
    const hash = ComputeMd5Hash(textToSign);
    setHashFunction(hash);
    const signed = rsa.MaHoa(hash);
    setSignature(signed);
    setSignedText(textToSign);
  };

  const convert = () => {
    setVerificationText(textToSign);
    setVerificationSignature(signature);
    setVerificationResult(hashFunction);
    
  }

  const handleVerify = () => {
    const hash = ComputeMd5Hash(verificationText);
    const decryptedHash = rsa.GiaiMa(verificationSignature);
    setNotification(hash === decryptedHash ? 'Chữ ký hợp lệ' : 'Chữ ký không hợp lệ');
  };

  return (
    <div className='app'>
      <div className='digitalSignatures'>
        <p className='tt'>CHỮ KÝ SỐ</p>
        <div className='signature'>
          <div className='generatedSignature'>
            <p className='title'>Phát sinh chữ ký</p>
            <div className='group'>
              <p>Văn bản ký</p>
              <textarea value={textToSign} onChange={(e) => setTextToSign(e.target.value)} />
              <button >File</button>
            </div>

            <div className='bt-sign'>
              <button onClick={handleSign}>Ký</button>
            </div>

            <div className='gr-hashFunction'>
              <p>Hàm băm</p>
              <textarea value={hashFunction} readOnly />
            </div>

            <div className='group'>
              <p>Chữ ký</p>
              <textarea value={signature} readOnly />
              <div className='gr-btn'>
                <button className='btn1' onClick={convert}>Chuyển</button>
                <button className='btn2'>Lưu</button>
              </div>
            </div>

          </div>

          <div className='checkSignature'>
            <p className='title'>Kiểm tra chữ ký</p>

            <div className='group'>
              <p>Văn bản ký</p>
              <textarea value={verificationText} onChange={(e) => setVerificationText(e.target.value)} />
              <button>File văn bản</button>
            </div>

            <div className='bt-sign'>
              <button onClick={handleVerify}>Kiểm tra chữ kí</button>
            </div>
            <div className='group'>
              <p>Chữ ký</p>
              <textarea value={verificationSignature} onChange={(e) => setVerificationSignature(e.target.value)} />
              <button>File chữ ký</button>
            </div>

            <div className='gr-hashFunction'>
              <p>Hàm băm</p>
              <textarea value={verificationResult} readOnly />
            </div>

            <div className='gr-hashFunction'>
              <p>Thông báo</p>
              <textarea value={notification} readOnly />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App;