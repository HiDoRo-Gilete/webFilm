export const getListDate = (date_start,date_end) =>{
    let currentDate =  new Date() > date_start ? new Date():new Date(date_start);
    const endDate = new Date(date_end)
    const date = [];
    while(currentDate<=endDate){
        date.push((new Date(currentDate)).toLocaleDateString('vi-VN', 
            {
                weekday: 'long', // Tên đầy đủ của thứ
                day: 'numeric',
                month: 'long', // Tên đầy đủ của tháng
                year: 'numeric'
              }
        ));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    //console.log(date)
    return date;
}
export const formatDate = (dateString) =>{
    let datePart = dateString.split(", ")[1];
    let yearPart =  dateString.split(", ")[2];
  
    // Thay thế "tháng" và khoảng trắng bằng "_"
    let formattedDate = datePart.replace(" tháng ", "_")+'_'+yearPart;
    return formattedDate;
  }
export const dateShow = (dateString)=>{
    let datePart = dateString.split(", ")[1];
    let yearPart =  dateString.split(", ")[2];
  
    // Thay thế "tháng" và khoảng trắng bằng "_"
    let formattedDate = datePart.replace(" tháng ", "/")+'/'+yearPart+` (${dateString.split(", ")[0]})`;
    return formattedDate;
  }
