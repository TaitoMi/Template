const options = document.querySelector('.year__options');

for(let i = 1960; i <= 2015; i++) {
	let li = document.createElement('li');
	li.innerText = i;
	li.setAttribute('data-year', i);
	options.appendChild(li);
}

const optionsBtn = document.querySelector('.year__btn');

optionsBtn.addEventListener('click', () => {
	document.querySelector('.year__options').classList.toggle('year__options-active');	
})
const year = document.querySelectorAll('.year__options > li');
for(let i = 0; i < year.length; i++) {
	year[i].addEventListener('click', () => {
		let dataYear = year[i].getAttribute('data-year');
		document.querySelector('.year > span').innerText = dataYear;
		document.querySelector('.year').setAttribute('data-value', dataYear);
		document.querySelector('.year__options').classList.toggle('year__options-active');	
	})
}