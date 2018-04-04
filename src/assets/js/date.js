function add0(num){
	return num<10?'0'+num:num;
}
export function formatDate(date){
	let year = date.getFullYear();
	let month = add0(date.getMonth());
	let day = add0(date.getDate());
	let hour = add0(date.getHours());
	let minutes = add0(date.getMinutes());

	return year+'-'+month+'-'+day+' '+hour+':'+minutes
}