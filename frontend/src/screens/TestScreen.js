import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React from 'react';
import axios from 'axios';

const TestScreen = () => {
  // bas64를 blob으로 변환해주는 함수
  function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const image_data = atob(b64Data.split(',')[1]); // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다

    const arraybuffer = new ArrayBuffer(image_data.length);
    const view = new Uint8Array(arraybuffer);

    for (let i = 0; i < b64Data.split(',')[1].length; i++) {
      view[i] = image_data.charCodeAt(i) & 0xff;
      // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
      // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
    }

    return new Blob([arraybuffer], { type: contentType });
  }
  document.querySelector('#test').addEventListener('click', tmp);
  const tmp = () => {
    console.log('제출테스트');
    const contentType = 'image/png';
    const b64Data =
      'data:image/gif;base64,R0lGODlhAAEAAcQAALe9v9ve3/b393mDiJScoO3u74KMkMnNz4uUmKatsOTm552kqK+1uNLW18DFx3B7gP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE5QjEwQjYyNTc4MkUxRURBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzN0VEMDZBQjMyNzExRTE4REMzRUZGMkFCOTM1NkZBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzN0VEMDY5QjMyNzExRTE4REMzRUZGMkFCOTM1NkZBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDI4MDExNzQwNzIwNjgxMTlCMTBCNjI1NzgyRTFFREEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTlCMTBCNjI1Nzgy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';

    const blob = b64toBlob(b64Data, contentType); // base64 -> blob

    const file = new File([blob], '파일명1', { type: 'image/jpeg' });
    console.log(file);

    const formData = new FormData();
    formData.append('img', file);
    axios.post(
      'http://localhost:8080/mygifticon/',
      { formData },
      {
        headers: 'multipart/form-data',
      }
    );
  };

  return (
    <View>
      <Text>TestScreen</Text>
      <Button title="테스트" onPress={tmp} />
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
