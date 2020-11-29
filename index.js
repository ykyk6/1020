// 引用line機器人套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
import axios from 'axios'
import cheerio from 'cheerio'

// 讀取.env
dotenv.config()
// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const updateData = async(abc, event)=>{
  try{
      const text=abc
      const city=text.split('').slice(0,3).join('')
      let array=[];
      const url =encodeURI(`https://www.lev.org.tw/subsidy/station2.aspx?city=${city}`);
      const response=await axios.get(url)
      const $ =cheerio.load(response.data)
      let reply = ''


      for(let i=0;i<$('table tbody tr td').length;i++){
          if($('table tbody tr td div').eq(i).text().includes(`${text}`)){
          // console.log($('table tbody tr td div').eq(i).text())
          // console.log($('table tbody tr td div').eq(i-1).text())
          // console.log($('table tbody tr td div').eq(i-2).children().attr('href'))
          array.push({address:$('table tbody tr td div').eq(i).text(),misei:$('table tbody tr td div').eq(i-1).text(),map:$('table tbody tr td div').eq(i-2).children().attr('href')})
          }
      }
      if (array.length < 12) {
        for(let i = 0; i < 11;i++){
          array.push('noResult')
        }
      }
      console.log(array)
      reply = {
        "type": 'flex',
        "altText": 'Flex',
        "contents": {
          "type": 'carousel',
        "contents": [
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[0].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                }, 
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[0].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[0].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[1].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                 {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[1].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[1].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          }, 
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[2].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[2].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[2].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[3].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[3].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[3].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[4].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[4].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[4].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[5].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[5].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[5].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[6].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[6].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[6].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[7].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[7].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[7].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[8].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[8].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[8].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[9].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[9].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[9].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[10].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[10].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[10].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
          {
            "type": "bubble",
            // "hero": {
            //   "type": "image",
            //   "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            //   "size": "full",
            //   "aspectRatio": "20:13",
            //   "aspectMode": "cover",
            //   "action": {
            //     "type": "uri",
            //     "uri": "http://linecorp.com/"
            //   }
            // },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": array[11].misei,
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "md",
                  "contents": []
                },
                {
                  "type": "separator",
                  "color": "#808080"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "地址",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 1
                        },
                        {
                          "type": "text",
                          "text": array[11].address,
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 5
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "secondary",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "Google Map",
                    "uri": array[11].map
                  }
                },
                {
                  "type": "spacer",
                  "size": "sm"
                }
              ],
              "flex": 0
            }
          },
        
         
          
         
          
         
         
         
          
          
          
         
          
         
         
          
          
        ]
      }
    }
    console.log(array.length)
    const index = array.indexOf(array.find(item=>item === 'noResult'))
    if(index!==-1) reply.contents.contents.splice(index)
    event.reply(reply)
  }catch(error){
      console.log(error)
  }
  }

bot.on('message', async event => {
  // console.log(event.message.text)
  // event.reply(event.message.text)
  try{
    const text=event.message.text
    updateData(text, event)
  }catch(error){
    console.log(error)
  }
})
bot.listen('/', process.env.PORT, () => { console.log('機器人已啟動') }) 
