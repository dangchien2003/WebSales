// chechc is number
function isNumber(variable) {
    // Kiểm tra xem biến có phải là một số nguyên hoặc số thực
    if (typeof variable === 'number' && !isNaN(variable)) {
      return true;
    }

    // Kiểm tra xem biến có phải là một chuỗi chỉ chứa các ký tự số
    if (typeof variable === 'string' && variable.trim() !== '' && !isNaN(variable)) {
      return true;
    }
  
    return false;
}