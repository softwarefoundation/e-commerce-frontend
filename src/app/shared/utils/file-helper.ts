export class FileHelper {

  static IMAGEM_PADRAO_CARD_UPLOAD = 'assets/img/quadrado-cinza.png';

  static convertParaBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((<string>reader.result));
      reader.onerror = error => reject(error);
    });
  }

}
