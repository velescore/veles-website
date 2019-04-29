/*
 * Properly loads main single page app when starting url is different from index
 * page.
 * 
 * Copyright (C) 2019 The Veles Core developers
 * Author: Altcoin Baggins
 *
 * This program is free software: you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 
 * of the License, or (at your option) any later version.
 */
$('#header-wrapper').load('index.html #header-wrapper');
$('#footer-wrapper').load('index.html #footer-wrapper');
