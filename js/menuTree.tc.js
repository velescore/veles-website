/*
 * Veles Website sctucture in js/json format.
 *
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 */
var menuTree = [
	{
		'page': 'index',
			'title': '首頁',
			'sections': [
			{ 'title': '準備開始' },
			{ 'title': '重塑線上隱私' },
			{ 'title': '創新網络' },
			{ 'title': '資金和啟動' },
			{ 'title': '合理的經濟模型' },
			{ 'title': '開放治理'},
			 { 'title': '主要功能'}
		],
		'hideFromNav': true,
	},
    {
	    'title': 'dVPN',
	    'items': [
	        { 
	          'title': 'dVPN',
	          'sections': [
	            { 'title': 'dVPN Launch' },
	            { 'title': 'Download Config' }
	          ]
	        },
	        { 
	          'page': 'linux-guide',
	          'title': 'Linux Guide',
	          'sections': [
	            { 'title': 'OpenVPN Guide' },
	            { 'title': 'Stunnel Guide' },
	            { 'title': 'ObfsProxy Guide'}
	          ]
	        },
	        { 
	          'page': 'windows-guide',	
	          'title': 'Windows Guide',
	          'sections': [
	            { 'title': 'OpenVPN Guide' },
	            { 'title': 'Stunnel Guide' },
	            { 'title': 'ObfsProxy Guide'}
	          ]
	        },
	        { 
	          'page': 'osx-guide',
	          'title': 'OSX Guide',
	          'sections': [
	            { 'title': 'OpenVPN Guide' },
	            { 'title': 'Stunnel Guide' }
	          ]
	        },
	        { 
	          'page': 'android-guide',
	          'title': 'Android Guide',
	          'sections': [
	            { 'title': 'OpenVPN Guide' },
	            { 'title': 'Stunnel Guide' }
	          ]
	        },
	        { 
	          'page': 'ios-guide',
	          'title': 'iOS Guide',
	          'sections': [
	            { 'title': 'OpenVPN Guide' }
	          ]
	        }
	    ]
  	},
	{
		'page': 'roadmap',
		'title': '路線圖',
		'sections': [
			{ 'title': 'Q1' },
			{ 'title': 'Q2' },
			{ 'title': 'Q3' },
			{ 'title': 'Q4' }
		]
	},
	{
		'page': 'team',
		'title': '團隊情況',
		'sections': [
			{ 'title': '關於我們' },
			{ 'title': 'AltcoinBaggins' },
			{ 'title': 'Mdfkbtc' },
			{ 'title': 'Uhlik' },
			{ 'title': 'Virtuado' },
			{ 'title': 'Maty' },
        	{ 'title': 'AlexDeLarge' },
        { 'title': 'Clover' }	
		]
	},
	{
		'page': 'download',
		'title': '下載',
		'sections': [
			{ 'title': 'Linux 錢包' },
			{ 'title': 'Windows 錢包' },
			{ 'title': 'macOS 錢包' },
			{ 'title': 'RaspberryPi 錢包' },
			{ 'title': 'Veles 源代碼' }
		]
	},
	{
		'page': 'resources',
		'title': '相關資源',
		'items': [
			{ 'page': 'coin-specs', 'title': '代幣規則'},
			{ 'page': 'whitepaper', 'title': '白皮書' },
			{ 'page': 'masternode-guide', 'title': '主節點搭建指南'},
			{ 'page': 'exchanges', 'title': '交易所'},
			{ 'page': 'mining-pools', 'title': '礦池'},
			{ 'page': 'external-services', 'title': '外部服務' },
			{ 'page': 'crowdfundings', 'title': '融資' },
			{ 'page': 'faq', 'title': '常見問題' }
		]
	},
	{
  'page': 'Wallet',
      'title': '錢包',
      'items': [
          {
            'title': '搜索',
              'url': 'https://wallet.veles.network'
          },
          {
            'title': '登錄',
            'url': 'https://wallet.veles.network/#wallet'
          },
          {
            'title': '生成',
            'url': 'https://wallet.veles.network/#newAddress'
          },
          {
            'title': '驗證',
            'url': 'https://wallet.veles.network/#verify'
          },
          {
            'title': '簽名',
            'url': 'https://wallet.veles.network/#sign'
          },
          {
            'title': '廣播',
            'url': 'https://wallet.veles.network/#broadcast'
          }
      ]
  },
	{
		'page': 'Explorer',
		'title': '瀏覽器',
		'items': [
			{
				'title': '搜索',
			  	'url': 'https://explorer.veles.network'
			},
			{
				'title': '代幣富豪榜',
				'url': 'https://explorer.veles.network/Richlist'
			},
			{
				'title': '主節點',
				'url': 'https://explorer.veles.network/masternodes'
			},
			{
				'title': '代幣流通',
				'url': 'https://explorer.veles.network/movement'
			},
			{
				'title': '挖礦状態',
				'url': 'https://explorer.veles.network/miningstats'
			},
			{
				'title': 'Api',
				'url': 'https://explorer.veles.network/info'
			}
		]
	}
];
