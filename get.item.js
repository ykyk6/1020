import axios from 'axios'
import cheerio from 'cheerio'

const updateData = async()=>{
    try{
        const text=''
        const array=[];
        const url =encodeURI('https://www.lev.org.tw/subsidy/station2.aspx?city=高雄市');
        const response=await axios.get(url)
        const $ =cheerio.load(response.data)


        for(let i=0;i<$('table tbody tr td').length;i++){
            if($('table tbody tr td div').eq(i).text().includes('高雄市 楠梓區')){
            // console.log($('table tbody tr td div').eq(i).text())
            // console.log($('table tbody tr td div').eq(i-1).text())
            // console.log($('table tbody tr td div').eq(i-2).children().attr('href'))
            array.push({address:$('table tbody tr td div').eq(i).text(),misei:$('table tbody tr td div').eq(i-1).text(),map:$('table tbody tr td div').eq(i-2).children().attr('href')})
        }
    }
    console.log(array)
    }catch(error){
        console.log(error)
    }
    }
    updateData()




