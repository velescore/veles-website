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
            'title': 'Inicio',
            'sections': [
          { 'title': 'Donde comenzar' },
          { 'title': 'Restaurando la privacidad online' },
          { 'title': 'Red Innovadora' },
          { 'title': 'Recaudación de fondos y Lanzamiento' },
            { 'title': 'Un modelo económico sensato' },
            { 'title': 'Gobierno abierto' },
             { 'title': 'Caracterìsticas' }
        ],
        'hideFromNav': true,
    },
    {
        'page': 'roadmap',
      'title': 'Hoja de ruta'
      'sections': [
            { 'title': 'Q1' },
            { 'title': 'Q2' },
            { 'title': 'Q3' },
             { 'title': 'Q4' }
        ]
    },
    {
    'page': 'team',
        'title': 'Equipo',
        'sections': [
        { 'title': 'Acerca de' },
        { 'title': 'AltcoinBaggins' },
        { 'title': 'Mdfkbtc' },
        { 'title': 'Uhlik' },
        { 'title': 'Virtuado' },
         { 'title': 'Maty' }
        ]
    },
    {
    'page': 'download',
        'title': 'Descargas',
        'sections': [
          { 'title': 'Linux Wallet' },
            { 'title': 'Windows Wallet' },
            { 'title': 'macOS Wallet' },
            { 'title': 'RaspberryPi Wallet' },
             { 'title': 'Còdigo fuente' }
        ]
    },
    {
    'page': 'resources'
        'title': 'Recursos',
        'items': [
            { 'title': 'Especificaciones' },
            { 'title': 'Whitepaper' },
            { 'title': 'Guìa de MNs' },
            { 'title': 'Exchanges' },
            { 'title': 'Pools de Minado'},
            { 'title': 'Servicios externps'},
            { 'title': 'Recaudaciònes comunitarias'},
            { 'title': 'FAQ' }
        ]
    },
    {
    'page': 'Explorer',
        'title': 'Explorador',
        'items': [
            {
                'title': 'Inicio',
                'url': 'https://explorer.veles.network'
            },
            {
                'title': 'Richlist',
                'url': 'https://explorer.veles.network/Richlist'
            },
            {
                'title': 'Masternodes',
                'url': 'https://explorer.veles.network/masternodes'
            },
            {
                'title': 'Movimiento',
                'url': 'https://explorer.veles.network/movement'
            },
            {
                'title': 'Estadìsticas de minado',
                'url': 'https://explorer.veles.network/miningstats'
            },
            {
                'title': 'Api',
                'url': 'https://explorer.veles.network/info'
            }
        ]
    }
];
