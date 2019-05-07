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
		'page': 'indexCN',
	   	'title': '首页',
	   	'sections': [
		   { 'title': '准备开始' },
		   { 'title': '介绍' },
		   { 'title': '动态特征' },
		   { 'title': '启动资金' },
		   { 'title': '主要功能' },
		   { 'title': '推特'}
	   ],
	   'hideFromNav': true,
	},
	{
	   'title': '路线图',
	   'sections': [
		   { 'title': 'Q1' },
		   { 'title': 'Q2' },
		   { 'title': 'Q3' },
		   { 'title': 'Q4' }
	   ]
	},
	{
	   'title': '团队情况',
	   'sections': [
		   { 'title': '关于我们' },
		   { 'title': 'AltcoinBaggins' },
		   { 'title': 'Mdfkbtc' },
		   { 'title': 'Uhlik' },
		   { 'title': 'Virtuado' },
			 { 'title': 'Maty' }
	   ]
	},
	{
	   'title': '下载',
	   'sections': [
		   { 'title': 'Linux 钱包' },
		   { 'title': 'Windows 钱包' },
		   { 'title': 'macOS 钱包' },
		   { 'title': 'RaspberryPi 钱包' },
		   { 'title': '源代码' },
		   { 'title': '白皮书' }

	   ]
	},
	{
		'title': '相关资源',
		'items': [
			{ 'title': '代币规则' },
			{ 'title': '白皮书' },
			{ 'title': '矿池'},
			{ 'title': '外部服务'},
			{ 'title': '众筹'},
			{ 'title': '常见问题' },
			{ 'title': '百科' },
		]
	},
	{
		'title': '浏览器',
		'items': [
			{
				'title': '搜索',
			  	'url': 'https://explorer.veles.network'
			},
			{
				'title': '代币富豪榜',
				'url': 'https://explorer.veles.network/Richlist'
			},
			{
				'title': '主节点',
				'url': 'https://explorer.veles.network/masternodes'
			},
			{
				'title': '代币流通',
				'url': 'https://explorer.veles.network/movement'
			},
			{
				'title': '挖矿状态',
				'url': 'https://explorer.veles.network/miningstats'
			},
			{
				'title': 'Api',
				'url': 'https://explorer.veles.network/info'
			}
		]
	}
];
