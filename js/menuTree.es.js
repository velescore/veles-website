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
      { 'title': 'Privacidad online' },
      { 'title': 'Red Innovadora' },
      { 'title': 'Lancamiento inicial' },
      { 'title': 'Modelo económico' },
      { 'title': 'Gobierno abierto' },
       { 'title': 'Caracterìsticas' }
    ],
    'hideFromNav': true,
  },
  {
    'page': 'roadmap',
      'title': 'Hoja de ruta',
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
    'page': 'resources',
      'title': 'Recursos',
      'items': [
        { 'page': 'coin-specs', 'title': 'Especificaciones' },
        { 'page': 'whitepaper', 'title': 'Whitepaper' },
        { 'page': 'masternode-guide', 'title': 'Guìa de MNs' },
        { 'page': 'exchanges', 'title': 'Exchanges' },
        { 'page': 'mining-pools', 'title': 'Pools de Minado'},
        { 'page': 'external-service', 'title': 'Servicios externos'},
        { 'page': 'crowdfundings', 'title': 'Recaudaciònes comunitarias'},
        { 'page': 'faq', 'title': 'FAQ' }
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
