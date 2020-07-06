const colorsArray = ["#9A8185", "#F0BDB9", "#79889B", "#34706c", "#B1DDDE", "#7D8971", "#8995A5","#234A23"];

const colorData = () => {
    let color;
    return colorsArray[Math.floor(Math.random() * 7)]
}

const $siteList = $('.siteList');
console.log($siteList)
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'Y', url: 'https://www.yuque.com', color: '#79889B'},
    {logo: 'G', url: 'https://www.github.com', color: '#deb23a'}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        console.log(node)
        const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
            returnColors()
        })
    })
};


render();

console.log(hashMap)
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url,
        color: colorData()
    })
    render()
    returnColors()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}


$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

const returnColors = () => {
    let a = $('.site')
for(let i=0;i<hashMap.length;i++){
    a[i].style.backgroundColor = hashMap[i].color
}
}
returnColors()


