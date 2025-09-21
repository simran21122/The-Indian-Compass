// src/data/culturalPlaces.js
// Major Indian cultural and heritage sites for the interactive map
const culturalPlaces = [
  {
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    description: "A UNESCO World Heritage Site, the Taj Mahal is an ivory-white marble mausoleum built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_in_March_2004.jpg/200px-Taj_Mahal_in_March_2004.jpg",
    lat: 27.1751,
    lng: 78.0421,
    details: {
      history: "Built between 1631 and 1648, the Taj Mahal is a symbol of eternal love and a masterpiece of Mughal architecture.",
      significance: "It attracts millions of tourists annually and is considered one of the New Seven Wonders of the World.",
      festivals: "Taj Mahotsav, held annually in February, celebrates the rich cultural heritage of the region."
    }
  },
  {
    name: "Hampi",
    city: "Hampi",
    state: "Karnataka",
    description: "The ruins of Hampi, once the capital of the Vijayanagara Empire, are a UNESCO World Heritage Site known for their stunning temples and monuments.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Hampi_virupaksha_temple.jpg/200px-Hampi_virupaksha_temple.jpg",
    lat: 15.335,
    lng: 76.462,
    details: {
      history: "Hampi flourished in the 14th century as a major trading center and was renowned for its wealth and architecture.",
      significance: "The site is famous for its Dravidian temples and intricate stone carvings.",
      festivals: "Hampi Utsav, a cultural festival, is celebrated with music, dance, and processions."
    }
  },
  {
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    description: "A 13th-century CE Sun Temple, renowned for its chariot-shaped architecture and intricate stone carvings.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Konark_Sun_Temple_Front_View.jpg/200px-Konark_Sun_Temple_Front_View.jpg",
    lat: 19.8876,
    lng: 86.0945,
    details: {
      history: "Built by King Narasimhadeva I in 1250 CE, the temple is dedicated to the Hindu Sun God, Surya.",
      significance: "It is a UNESCO World Heritage Site and a marvel of ancient Indian engineering.",
      festivals: "The Konark Dance Festival showcases classical Indian dance forms every December."
    }
  },
  {
    name: "Jagannath Temple",
    city: "Puri",
    state: "Odisha",
    description: "A sacred Hindu temple dedicated to Lord Jagannath, famous for its annual Rath Yatra.",
  thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jagannath_Temple_Puri.jpg/200px-Jagannath_Temple_Puri.jpg",
    lat: 19.8135,
    lng: 85.8312,
    details: {
      history: "Built in the 12th century by King Anantavarman Chodaganga Deva.",
      significance: "One of the Char Dham pilgrimage sites for Hindus.",
      festivals: "Rath Yatra is the most famous festival here."
    }
  },
  {
    name: "Udayagiri and Khandagiri Caves",
    city: "Bhubaneswar",
    state: "Odisha",
    description: "Ancient rock-cut caves with Jain and Buddhist heritage, dating back to the 1st century BCE.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Udayagiri_Caves_Odisha.jpg/200px-Udayagiri_Caves_Odisha.jpg",
    lat: 20.2331,
    lng: 85.7881,
    details: {
      history: "Commissioned by King Kharavela, these caves served as residential blocks for Jain monks.",
      significance: "A major archaeological and tourist site in Odisha.",
      festivals: "Mahavir Jayanti and local festivals."
    }
  },
  // Ladakh
  {
    name: "Thiksey Monastery",
    city: "Thiksey",
    state: "Ladakh",
    description: "A 12-story monastery complex, one of the largest in central Ladakh, known for its resemblance to the Potala Palace in Lhasa.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Thiksey_Monastery_Ladakh.jpg/200px-Thiksey_Monastery_Ladakh.jpg",
    lat: 34.0566,
    lng: 77.6364,
    details: {
      history: "Founded in the mid-15th century by the Gelugpa sect of Tibetan Buddhism.",
      significance: "A major center for Buddhist learning and culture in Ladakh.",
      festivals: "Gustor Festival."
    }
  },
  {
    name: "Pangong Lake",
    city: "Pangong Tso",
    state: "Ladakh",
    description: "A high-altitude lake stretching from India to China, famous for its changing colors and scenic beauty.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pangong_Lake_Ladakh.jpg/200px-Pangong_Lake_Ladakh.jpg",
    lat: 33.7294,
    lng: 78.9039,
    details: {
      history: "A natural wonder and popular tourist destination.",
      significance: "Known for its breathtaking views and migratory birds.",
      festivals: "Pangong Tso Festival."
    }
  },
  {
    name: "Leh Palace",
    city: "Leh",
    state: "Ladakh",
    description: "A 17th-century former royal palace overlooking the town of Leh, built by King Sengge Namgyal.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Leh_Palace_Ladakh.jpg/200px-Leh_Palace_Ladakh.jpg",
    lat: 34.1667,
    lng: 77.5833,
    details: {
      history: "Once the residence of the royal family of Ladakh, now a museum and tourist site.",
      significance: "A symbol of Ladakhi heritage and architecture.",
      festivals: "Ladakh Festival."
    }
  },
  // Andhra Pradesh
  {
    name: "Tirumala Venkateswara Temple",
    city: "Tirupati",
    state: "Andhra Pradesh",
    description: "One of the most visited pilgrimage sites in the world, dedicated to Lord Venkateswara.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Tirumala_Temple_2017.jpg/200px-Tirumala_Temple_2017.jpg",
    lat: 13.6839,
    lng: 79.3473,
    details: {
      history: "The temple has origins dating back to ancient times and is mentioned in many Hindu scriptures.",
      significance: "It attracts millions of devotees annually and is renowned for its spiritual atmosphere.",
      festivals: "Brahmotsavam is the grandest festival celebrated here."
    }
  },
  // Nagaland
  {
    name: "Kohima War Cemetery",
    city: "Kohima",
    state: "Nagaland",
    description: "A memorial for soldiers of the Allied Forces who died in World War II.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kohima_War_Cemetery_Nagaland.jpg/200px-Kohima_War_Cemetery_Nagaland.jpg",
    lat: 25.6747,
    lng: 94.1100,
    details: {
      history: "Built in memory of the Battle of Kohima (1944).",
      significance: "A symbol of peace and reconciliation.",
      festivals: "Annual memorial services."
    }
  },
  {
    name: "Dzukou Valley",
    city: "Viswema",
    state: "Nagaland",
    description: "A scenic valley on the border of Nagaland and Manipur, famous for its seasonal flowers.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Dzukou_Valley_Nagaland.jpg/200px-Dzukou_Valley_Nagaland.jpg",
    lat: 25.5833,
    lng: 93.8333,
    details: {
      history: "A popular trekking destination and site of natural beauty.",
      significance: "Known for the rare Dzukou lily.",
      festivals: "Hornbill Festival treks."
    }
  },
  {
    name: "Hornbill Festival Grounds",
    city: "Kisama",
    state: "Nagaland",
    description: "Venue for the annual Hornbill Festival, showcasing Naga culture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hornbill_Festival_Nagaland.jpg/200px-Hornbill_Festival_Nagaland.jpg",
    lat: 25.6500,
    lng: 94.1167,
    details: {
      history: "Festival started in 2000 to promote inter-tribal interaction.",
      significance: "A major cultural event in Northeast India.",
      festivals: "Hornbill Festival (December)."
    }
  },
  {
    name: "Lepakshi Temple",
    city: "Lepakshi",
    state: "Andhra Pradesh",
    description: "Famous for its hanging pillar and exquisite Vijayanagara architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lepakshi_temple.jpg/200px-Lepakshi_temple.jpg",
    lat: 13.8041,
    lng: 77.6088,
    details: {
      history: "Built in the 16th century by the Vijayanagara kings.",
      significance: "Known for its intricate carvings and the legendary hanging pillar.",
      festivals: "Veerabhadra Swamy festival is celebrated with devotion."
    }
  },
  {
    name: "Undavalli Caves",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    description: "Ancient rock-cut caves dating back to the 4th-5th centuries, featuring a huge monolithic statue of Vishnu.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Undavalli_Caves_1.jpg/200px-Undavalli_Caves_1.jpg",
    lat: 16.4822,
    lng: 80.6042,
    details: {
      history: "The caves were carved out of solid sandstone on a hillside.",
      significance: "A fine example of Indian rock-cut architecture.",
      festivals: "Local festivals and rituals are held here."
    }
  },
  // Arunachal Pradesh
  {
    name: "Tawang Monastery",
    city: "Tawang",
    state: "Arunachal Pradesh",
    description: "The largest monastery in India and an important center of Mahayana Buddhism.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tawang_Monastery_Arunachal_Pradesh.jpg/200px-Tawang_Monastery_Arunachal_Pradesh.jpg",
    lat: 27.5867,
    lng: 91.8667,
    details: {
      history: "Founded in the 17th century by Merak Lama Lodre Gyatso.",
      significance: "A spiritual and cultural center for Buddhists in the region.",
      festivals: "Torgya Festival is celebrated with masked dances."
    }
  },
  {
    name: "Ziro Valley",
    city: "Ziro",
    state: "Arunachal Pradesh",
    description: "A picturesque valley known for its unique Apatani tribal culture and scenic beauty.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ziro_Valley.jpg/200px-Ziro_Valley.jpg",
    lat: 27.6094,
    lng: 93.8326,
    details: {
      history: "Home to the Apatani tribe, known for their sustainable farming methods.",
      significance: "A UNESCO World Heritage tentative site.",
      festivals: "Ziro Music Festival attracts artists and tourists from all over."
    }
  },
  {
    name: "Parshuram Kund",
    city: "Lohit",
    state: "Arunachal Pradesh",
    description: "A sacred Hindu pilgrimage site on the Brahmaputra river, associated with the sage Parshuram.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Parshuram_Kund.jpg/200px-Parshuram_Kund.jpg",
    lat: 27.9406,
    lng: 96.3747,
    details: {
      history: "Mentioned in ancient Hindu texts as a place of penance for Parshuram.",
      significance: "Thousands of devotees visit during Makar Sankranti.",
      festivals: "Makar Sankranti is the main festival celebrated here."
    }
  },
  // Assam
  {
    name: "Kamakhya Temple",
    city: "Guwahati",
    state: "Assam",
    description: "A revered Hindu temple dedicated to the goddess Kamakhya, known for its unique rituals.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kamakhya_Temple_Guwahati.jpg/200px-Kamakhya_Temple_Guwahati.jpg",
    lat: 26.1645,
    lng: 91.7056,
    details: {
      history: "One of the oldest Shakti Peethas, with origins dating back to ancient times.",
      significance: "A major pilgrimage site, especially during the Ambubachi Mela.",
      festivals: "Ambubachi Mela is the most important festival here."
    }
  },
  {
    name: "Majuli Island",
    city: "Majuli",
    state: "Assam",
    description: "The world's largest river island, known for its Vaishnavite monasteries and vibrant culture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Majuli_Island.jpg/200px-Majuli_Island.jpg",
    lat: 26.9545,
    lng: 94.1456,
    details: {
      history: "Majuli has been the cultural capital of Assam since the 16th century.",
      significance: "Famous for its satras (monasteries) and traditional art forms.",
      festivals: "Raas Mahotsav is celebrated with great enthusiasm."
    }
  },
  {
    name: "Sivasagar",
    city: "Sivasagar",
    state: "Assam",
    description: "A historic town known for its Ahom-era monuments, temples, and tanks.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sivasagar_Tank.jpg/200px-Sivasagar_Tank.jpg",
    lat: 26.9821,
    lng: 94.6421,
    details: {
      history: "Capital of the Ahom Kingdom, with monuments like Rang Ghar and Talatal Ghar.",
      significance: "A center of Assamese culture and history.",
      festivals: "Bihu and other local festivals are celebrated here."
    }
  },
  {
    name: "Ajanta Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    description: "A group of 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Ajanta_Caves%2C_Aurangabad%2C_Maharashtra%2C_India.jpg/200px-Ajanta_Caves%2C_Aurangabad%2C_Maharashtra%2C_India.jpg",
    lat: 20.552,
    lng: 75.7033,
    details: {
      history: "The caves were used as monasteries and worship halls by Buddhist monks.",
      significance: "Famous for their ancient paintings and sculptures, they are a UNESCO World Heritage Site.",
      festivals: "Ajanta-Ellora Festival celebrates classical music and dance at the site."
    }
  },
  {
    name: "Golden Temple",
    city: "Amritsar",
    state: "Punjab",
    description: "The holiest Gurdwara and the most important pilgrimage site of Sikhism, known for its golden dome.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Golden_Temple%2C_Amritsar%2C_Punjab%2C_India.jpg/200px-Golden_Temple%2C_Amritsar%2C_Punjab%2C_India.jpg",
    lat: 31.620,
    lng: 74.8765,
    details: {
      history: "Built in the 16th century by Guru Arjan, the temple is a symbol of equality and brotherhood.",
      significance: "It serves free meals to thousands daily and is a spiritual center for Sikhs worldwide.",
      festivals: "Baisakhi and Guru Nanak Jayanti are celebrated with great fervor."
    }
  },
  {
    name: "Meenakshi Temple",
    city: "Madurai",
    state: "Tamil Nadu",
    description: "A historic Hindu temple dedicated to Meenakshi, a form of Parvati, known for its towering gopurams.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Meenakshi_Amman_Temple%2C_Madurai%2C_India.jpg/200px-Meenakshi_Amman_Temple%2C_Madurai%2C_India.jpg",
    lat: 9.9195,
    lng: 78.1191,
    details: {
      history: "The temple complex dates back to the 6th century, with most structures built in the 16th century.",
      significance: "It is a major pilgrimage site and architectural marvel of South India.",
      festivals: "Meenakshi Tirukalyanam is the grand annual festival celebrated here."
    }
  },
  {
    name: "Gateway of India",
    city: "Mumbai",
    state: "Maharashtra",
    description: "An iconic arch-monument built in the early 20th century, overlooking the Arabian Sea.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gateway_of_India%2C_Mumbai.jpg/200px-Gateway_of_India%2C_Mumbai.jpg",
    lat: 18.9218,
    lng: 72.8347,
    details: {
      history: "Built to commemorate the landing of King George V and Queen Mary in 1911.",
      significance: "A popular tourist destination and symbol of Mumbai.",
      festivals: "Various cultural events and festivals are held here throughout the year."
    }
  },
  {
    name: "Charminar",
    city: "Hyderabad",
    state: "Telangana",
    description: "A 16th-century mosque and monument, Charminar is a global icon of Hyderabad.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Charminar_Hyderabad_India.jpg/200px-Charminar_Hyderabad_India.jpg",
    lat: 17.3616,
    lng: 78.4747,
    details: {
      history: "Built in 1591 by Muhammad Quli Qutb Shah to commemorate the end of a deadly plague.",
      significance: "It is a symbol of Hyderabad's rich history and culture.",
      festivals: "Ramzan and other local festivals are celebrated here."
    }
  },
  {
    name: "Khajuraho Temples",
    city: "Khajuraho",
    state: "Madhya Pradesh",
    description: "A group of Hindu and Jain temples famous for their nagara-style architecture and erotic sculptures.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg/200px-Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg",
    lat: 24.8318,
    lng: 79.9199,
    details: {
      history: "Built between 950 and 1050 CE by the Chandela dynasty.",
      significance: "A UNESCO World Heritage Site, known for its intricate carvings and sculptures.",
      festivals: "Khajuraho Dance Festival is held annually, celebrating Indian classical dance."
    }
  },
  {
    name: "Sanchi Stupa",
    city: "Sanchi",
    state: "Madhya Pradesh",
    description: "A Buddhist complex famous for its Great Stupa, one of the oldest stone structures in India.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Sanchi_Stupa_No1.jpg/200px-Sanchi_Stupa_No1.jpg",
    lat: 23.4793,
    lng: 77.7391,
    details: {
      history: "Commissioned by Emperor Ashoka in the 3rd century BCE, the stupa is a major Buddhist pilgrimage site.",
      significance: "It is a UNESCO World Heritage Site and a symbol of Buddhist art and architecture.",
      festivals: "Buddha Purnima is celebrated here with great devotion."
    }
  },
  {
    name: "Victoria Memorial",
    city: "Kolkata",
    state: "West Bengal",
    description: "A grand marble building dedicated to Queen Victoria, now a museum and tourist destination.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Victoria_Memorial_Hall_Kolkata.jpg/200px-Victoria_Memorial_Hall_Kolkata.jpg",
    lat: 22.5448,
    lng: 88.3426,
    details: {
      history: "Built between 1906 and 1921, it commemorates the British Raj in India.",
      significance: "It houses a museum with a large collection of artifacts from the colonial period.",
      festivals: "Kolkata Christmas Festival and other cultural events are held here."
    }
  },
  {
    name: "Mysore Palace",
    city: "Mysuru",
    state: "Karnataka",
    description: "A historical palace and royal residence of the Wadiyar dynasty, known for its Dussehra celebrations.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mysore_Palace_Front_View.jpg/200px-Mysore_Palace_Front_View.jpg",
    lat: 12.3051,
    lng: 76.6551,
    details: {
      history: "Rebuilt in 1912, the palace is an architectural blend of Hindu, Muslim, Rajput, and Gothic styles.",
      significance: "It is one of the most visited tourist attractions in India.",
      festivals: "Mysore Dasara is celebrated with grandeur and illumination."
    }
  },
  {
    name: "Fatehpur Sikri",
    city: "Fatehpur Sikri",
    state: "Uttar Pradesh",
    description: "A historic city founded by Emperor Akbar, known for its stunning Mughal architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Fatehpur_Sikri_Buland_Darwaza_gate_2010.jpg/200px-Fatehpur_Sikri_Buland_Darwaza_gate_2010.jpg",
    lat: 27.0937,
    lng: 77.6611,
    details: {
      history: "Built in the late 16th century, it served as the capital of the Mughal Empire for a short period.",
      significance: "It is a UNESCO World Heritage Site and a fine example of Mughal planning and architecture.",
      festivals: "Urs of Salim Chishti is a major event here."
    }
  },
  {
    name: "Brihadeeswarar Temple",
    city: "Thanjavur",
    state: "Tamil Nadu",
    description: "A Hindu temple dedicated to Shiva, renowned for its massive tower and Chola architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Brihadeeswarar_Temple_Thanjavur.jpg/200px-Brihadeeswarar_Temple_Thanjavur.jpg",
    lat: 10.7828,
    lng: 79.1319,
    details: {
      history: "Built by Raja Raja Chola I in the 11th century, it is a UNESCO World Heritage Site.",
      significance: "The temple is an architectural marvel and a major pilgrimage site.",
      festivals: "Mahashivaratri and annual temple festivals are celebrated here."
    }
  },
  {
    name: "Qutub Minar",
    city: "Delhi",
    state: "Delhi",
    description: "A UNESCO World Heritage Site, Qutub Minar is the tallest brick minaret in the world.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Qutub_Minar_Tower_Delhi_India.jpg/200px-Qutub_Minar_Tower_Delhi_India.jpg",
    lat: 28.5244,
    lng: 77.1855,
    details: {
      history: "Construction began in 1192 by Qutb-ud-din Aibak and was completed by Iltutmish.",
      significance: "It is a symbol of Delhi's rich history and architectural excellence.",
      festivals: "Qutub Festival, a cultural event, is held here annually."
    }
  },
  {
    name: "Red Fort",
    city: "Delhi",
    state: "Delhi",
    description: "A historic fort in Delhi, served as the main residence of Mughal emperors for nearly 200 years.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Red_Fort_in_Delhi_03-2016_img3.jpg/200px-Red_Fort_in_Delhi_03-2016_img3.jpg",
    lat: 28.6562,
    lng: 77.2410,
    details: {
      history: "Built by Shah Jahan in the 17th century, it is a symbol of India's independence.",
      significance: "The Prime Minister hoists the national flag here every Independence Day.",
      festivals: "Independence Day celebrations and sound & light shows are major events."
    }
  },
  {
    name: "Ranakpur Jain Temple",
    city: "Ranakpur",
    state: "Rajasthan",
    description: "A renowned Jain temple dedicated to Tirthankara Adinatha, famous for its marble architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ranakpur_Jain_Temple.jpg/200px-Ranakpur_Jain_Temple.jpg",
    lat: 25.1106,
    lng: 73.4156,
    details: {
      history: "Built in the 15th century, the temple is supported by over 1,400 intricately carved marble pillars.",
      significance: "It is a major pilgrimage site for Jains and an architectural wonder.",
      festivals: "Mahavir Jayanti is celebrated with devotion here."
    }
  },
  {
    name: "Rani ki Vav",
    city: "Patan",
    state: "Gujarat",
    description: "A stepwell built in the 11th century, famous for its intricate sculptures and architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Rani_ki_Vav%2C_Patan.jpg/200px-Rani_ki_Vav%2C_Patan.jpg",
    lat: 23.8587,
    lng: 72.1014,
    details: {
      history: "Commissioned by Queen Udayamati in memory of King Bhima I, it is a UNESCO World Heritage Site.",
      significance: "The stepwell is an outstanding example of subterranean architecture in India.",
      festivals: "Rani ki Vav Festival celebrates the heritage of the site."
    }
  },
  {
    name: "Elephanta Caves",
    city: "Mumbai",
    state: "Maharashtra",
    description: "A network of sculpted caves located on Elephanta Island, known for rock-cut architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Elephanta_Caves_Main_Cave.jpg/200px-Elephanta_Caves_Main_Cave.jpg",
    lat: 18.9633,
    lng: 72.9311,
    details: {
      history: "The caves date back to the 5th to 8th centuries and are dedicated to Lord Shiva.",
      significance: "A UNESCO World Heritage Site, famous for its impressive sculptures and carvings.",
      festivals: "Elephanta Festival of Music and Dance is held annually."
    }}
    ,
  {
    name: "Basilica of Bom Jesus",
    city: "Old Goa",
    state: "Goa",
    description: "A UNESCO World Heritage Site, famous for its baroque architecture and the mortal remains of St. Francis Xavier.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Basilica_of_Bom_Jesus_Goa.jpg/200px-Basilica_of_Bom_Jesus_Goa.jpg",
    lat: 15.5009,
    lng: 73.9114,
    details: {
      history: "Built in 1605, it is one of the oldest churches in India.",
      significance: "A major pilgrimage site for Christians.",
      festivals: "Feast of St. Francis Xavier."
    }
  },
  {
    name: "Se Cathedral",
    city: "Old Goa",
    state: "Goa",
    description: "One of the largest churches in Asia, known for its Portuguese-Gothic architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Se_Cathedral_Goa.jpg/200px-Se_Cathedral_Goa.jpg",
    lat: 15.5036,
    lng: 73.9120,
    details: {
      history: "Built in the 16th century to commemorate the victory of the Portuguese over a Muslim army.",
      significance: "A symbol of Goa's colonial past.",
      festivals: "Feast of St. Catherine."
    }
  },
  {
    name: "Fort Aguada",
    city: "Candolim",
    state: "Goa",
    description: "A 17th-century Portuguese fort overlooking the Arabian Sea.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Fort_Aguada_Goa.jpg/200px-Fort_Aguada_Goa.jpg",
    lat: 15.4922,
    lng: 73.7736,
    details: {
      history: "Built in 1612 to guard against Dutch and Marathas.",
      significance: "A popular tourist destination and historical site.",
      festivals: "Local cultural events."
    }
  },
  // Gujarat
  {
    name: "Somnath Temple",
    city: "Prabhas Patan",
    state: "Gujarat",
    description: "One of the twelve Jyotirlinga shrines of Shiva, with a history of repeated destruction and reconstruction.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Somnath_Temple_Gujarat.jpg/200px-Somnath_Temple_Gujarat.jpg",
    lat: 20.8880,
    lng: 70.4012,
    details: {
      history: "The temple has been destroyed and rebuilt several times since ancient times.",
      significance: "A major pilgrimage site for Hindus.",
      festivals: "Maha Shivaratri."
    }
  },
  {
    name: "Sun Temple Modhera",
    city: "Modhera",
    state: "Gujarat",
    description: "A 11th-century temple dedicated to the Sun God, known for its intricate carvings.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sun_Temple_Modhera_Gujarat.jpg/200px-Sun_Temple_Modhera_Gujarat.jpg",
    lat: 23.5742,
    lng: 72.1402,
    details: {
      history: "Built in 1026-27 CE by King Bhima I of the Chalukya dynasty.",
      significance: "A masterpiece of Solanki architecture.",
      festivals: "Modhera Dance Festival."
    }
  },
  {
    name: "Sabarmati Ashram",
    city: "Ahmedabad",
    state: "Gujarat",
    description: "The residence of Mahatma Gandhi, now a museum dedicated to his life and work.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sabarmati_Ashram_Ahmedabad.jpg/200px-Sabarmati_Ashram_Ahmedabad.jpg",
    lat: 23.0600,
    lng: 72.5800,
    details: {
      history: "Gandhi lived here from 1917 to 1930.",
      significance: "A place of pilgrimage for followers of Gandhi and peace.",
      festivals: "Gandhi Jayanti."
    }
  },
  // Haryana
  {
    name: "Kurukshetra",
    city: "Kurukshetra",
    state: "Haryana",
    description: "A historic city, believed to be the site of the Mahabharata war.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kurukshetra_Brahma_Sarovar.jpg/200px-Kurukshetra_Brahma_Sarovar.jpg",
    lat: 29.9695,
    lng: 76.8783,
    details: {
      history: "Mentioned in ancient Hindu texts as the battlefield of the Mahabharata.",
      significance: "A major pilgrimage site for Hindus.",
      festivals: "Gita Jayanti."
    }
  },
  {
    name: "Sultanpur National Park",
    city: "Gurugram",
    state: "Haryana",
    description: "A bird sanctuary and national park, popular among birdwatchers.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sultanpur_National_Park_Haryana.jpg/200px-Sultanpur_National_Park_Haryana.jpg",
    lat: 28.4595,
    lng: 77.0266,
    details: {
      history: "Declared a bird sanctuary in 1972 and a national park in 1989.",
      significance: "Home to over 250 species of birds.",
      festivals: "Bird watching festivals and eco-events."
    }
  },
  {
    name: "Pinjore Gardens",
    city: "Pinjore",
    state: "Haryana",
    description: "A 17th-century Mughal garden, also known as Yadavindra Gardens.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pinjore_Gardens_Haryana.jpg/200px-Pinjore_Gardens_Haryana.jpg",
    lat: 30.8282,
    lng: 76.9182,
    details: {
      history: "Built in the 17th century by Nawab Fidai Khan.",
      significance: "A fine example of Mughal garden design.",
      festivals: "Pinjore Heritage Festival."
    }
  },
  // Himachal Pradesh
  {
    name: "Hadimba Temple",
    city: "Manali",
    state: "Himachal Pradesh",
    description: "A unique wooden temple dedicated to Hadimba Devi, surrounded by cedar forests.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hadimba_Temple_Manali.jpg/200px-Hadimba_Temple_Manali.jpg",
    lat: 32.2432,
    lng: 77.1887,
    details: {
      history: "Built in 1553 by Maharaja Bahadur Singh.",
      significance: "A major religious and tourist site in Manali.",
      festivals: "Hadimba Devi Fair."
    }
  },
  {
    name: "Jakhoo Temple",
    city: "Shimla",
    state: "Himachal Pradesh",
    description: "An ancient temple dedicated to Lord Hanuman, located on Jakhoo Hill.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jakhoo_Temple_Shimla.jpg/200px-Jakhoo_Temple_Shimla.jpg",
    lat: 31.1048,
    lng: 77.1734,
    details: {
      history: "Believed to be the place where Hanuman rested during his search for the Sanjeevani herb.",
      significance: "Offers panoramic views of Shimla.",
      festivals: "Dussehra and Hanuman Jayanti."
    }
  },
  {
    name: "Tashijong Monastery",
    city: "Tashijong",
    state: "Himachal Pradesh",
    description: "A Tibetan Buddhist monastery and community in the Kangra Valley.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tashijong_Monastery_Himachal.jpg/200px-Tashijong_Monastery_Himachal.jpg",
    lat: 32.1100,
    lng: 76.5500,
    details: {
      history: "Established in the 1960s by Tibetan refugees.",
      significance: "A center for Buddhist learning and culture.",
      festivals: "Cham Dance Festival."
    }
  },
  // Jharkhand
  {
    name: "Baidhyanath Dham",
    city: "Deoghar",
    state: "Jharkhand",
    description: "One of the twelve Jyotirlingas, a major Hindu pilgrimage site.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Baidyanath_Dham_Deoghar.jpg/200px-Baidyanath_Dham_Deoghar.jpg",
    lat: 24.4857,
    lng: 86.6990,
    details: {
      history: "Mentioned in ancient Hindu scriptures, attracts millions of devotees annually.",
      significance: "A major center for the Shravan Mela pilgrimage.",
      festivals: "Shravan Mela."
    }
  },
  {
    name: "Netarhat",
    city: "Netarhat",
    state: "Jharkhand",
    description: "A hill station known as the Queen of Chotanagpur, famous for its sunrise and sunset views.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Netarhat_Jharkhand.jpg/200px-Netarhat_Jharkhand.jpg",
    lat: 23.4833,
    lng: 84.2667,
    details: {
      history: "A popular summer retreat during the British era.",
      significance: "Known for its natural beauty and pleasant climate.",
      festivals: "Local tribal festivals."
    }
  },
  {
    name: "Betla National Park",
    city: "Latehar",
    state: "Jharkhand",
    description: "A national park and tiger reserve, rich in wildlife and history.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Betla_National_Park_Jharkhand.jpg/200px-Betla_National_Park_Jharkhand.jpg",
    lat: 23.8667,
    lng: 84.1833,
    details: {
      history: "Declared a national park in 1986, part of the Palamau Tiger Reserve.",
      significance: "Home to tigers, elephants, and many other species.",
      festivals: "Wildlife Week."
    }
  },
  // Kerala
  {
    name: "Padmanabhaswamy Temple",
    city: "Thiruvananthapuram",
    state: "Kerala",
    description: "A historic Hindu temple dedicated to Lord Vishnu, famous for its wealth and Dravidian architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Padmanabhaswamy_Temple_Kerala.jpg/200px-Padmanabhaswamy_Temple_Kerala.jpg",
    lat: 8.4826,
    lng: 76.9431,
    details: {
      history: "The temple has ancient origins and is mentioned in many Hindu texts.",
      significance: "Known for its immense treasures and spiritual significance.",
      festivals: "Alpashy and Painkuni festivals."
    }
  },
  {
    name: "Mattancherry Palace",
    city: "Kochi",
    state: "Kerala",
    description: "Also known as the Dutch Palace, famous for its murals and colonial architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mattancherry_Palace_Kochi.jpg/200px-Mattancherry_Palace_Kochi.jpg",
    lat: 9.9633,
    lng: 76.2594,
    details: {
      history: "Built by the Portuguese in 1555 and renovated by the Dutch in 1663.",
      significance: "A museum showcasing Kerala's royal heritage.",
      festivals: "Cochin Carnival."
    }
  },
  {
    name: "Athirappilly Falls",
    city: "Thrissur",
    state: "Kerala",
    description: "The largest waterfall in Kerala, often called the Niagara of India.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Athirappilly_Falls_Kerala.jpg/200px-Athirappilly_Falls_Kerala.jpg",
    lat: 10.2843,
    lng: 76.5695,
    details: {
      history: "A popular filming location and tourist destination.",
      significance: "Known for its scenic beauty and biodiversity.",
      festivals: "Local festivals and eco-events."
    }
  },
  // Madhya Pradesh
  {
    name: "Kanha National Park",
    city: "Mandla",
    state: "Madhya Pradesh",
    description: "One of India's largest national parks and a tiger reserve.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kanha_National_Park_Madhya_Pradesh.jpg/200px-Kanha_National_Park_Madhya_Pradesh.jpg",
    lat: 22.3344,
    lng: 80.6115,
    details: {
      history: "Declared a national park in 1955, part of Project Tiger.",
      significance: "Famous for its population of Bengal tigers and barasingha.",
      festivals: "Wildlife Week."
    }
  },
  {
    name: "Bhimbetka Rock Shelters",
    city: "Raisen",
    state: "Madhya Pradesh",
    description: "A UNESCO World Heritage Site, known for prehistoric cave paintings.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bhimbetka_Rock_Shelters_Madhya_Pradesh.jpg/200px-Bhimbetka_Rock_Shelters_Madhya_Pradesh.jpg",
    lat: 22.9386,
    lng: 77.6131,
    details: {
      history: "The shelters date back to the Paleolithic era.",
      significance: "Showcases some of the earliest traces of human life in India.",
      festivals: "Archaeological tours and events."
    }
  },
  {
    name: "Gwalior Fort",
    city: "Gwalior",
    state: "Madhya Pradesh",
    description: "A historic hill fort, known for its massive structure and palaces.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Gwalior_Fort_Madhya_Pradesh.jpg/200px-Gwalior_Fort_Madhya_Pradesh.jpg",
    lat: 26.2215,
    lng: 78.1780,
    details: {
      history: "Built in the 8th century, expanded by several rulers over time.",
      significance: "A symbol of the region's rich history and architecture.",
      festivals: "Gwalior Trade Fair and Tansen Music Festival."
    }
  },
  // Maharashtra (additional)
  {
    name: "Shaniwar Wada",
    city: "Pune",
    state: "Maharashtra",
    description: "A historical fortification in Pune, once the seat of the Peshwas of the Maratha Empire.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Shaniwar_Wada_Pune.jpg/200px-Shaniwar_Wada_Pune.jpg",
    lat: 18.5196,
    lng: 73.8553,
    details: {
      history: "Built in 1732, it was the center of Indian politics in the 18th century.",
      significance: "A major tourist attraction and historical site.",
      festivals: "Ganesh Chaturthi and cultural events."
    }
  },
  {
    name: "Shirdi Sai Baba Temple",
    city: "Shirdi",
    state: "Maharashtra",
    description: "A major pilgrimage site dedicated to Sai Baba of Shirdi.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Shirdi_Sai_Baba_Temple.jpg/200px-Shirdi_Sai_Baba_Temple.jpg",
    lat: 19.7667,
    lng: 74.4777,
    details: {
      history: "Sai Baba lived here from the late 19th to early 20th century.",
      significance: "Visited by millions of devotees every year.",
      festivals: "Sai Baba Samadhi Day and Ram Navami."
    }
  },
  {
    name: "Bibi Ka Maqbara",
    city: "Aurangabad",
    state: "Maharashtra",
    description: "A mausoleum built by Azam Shah in memory of his mother, often called the Taj of the Deccan.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bibi_Ka_Maqbara_Aurangabad.jpg/200px-Bibi_Ka_Maqbara_Aurangabad.jpg",
    lat: 19.9017,
    lng: 75.3203,
    details: {
      history: "Built in 1660, inspired by the Taj Mahal.",
      significance: "A fine example of Mughal architecture in the Deccan.",
      festivals: "Urs and local fairs."
  }},

  // Manipur
  {
    name: "Kangla Fort",
    city: "Imphal",
    state: "Manipur",
    description: "Historic fort and former seat of Manipur's rulers, symbol of Meitei heritage.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kangla_Fort_Imphal.jpg/200px-Kangla_Fort_Imphal.jpg",
    lat: 24.8074,
    lng: 93.9384,
    details: {
      history: "The fort has been the center of Manipur's power for centuries.",
      significance: "A symbol of Manipuri identity and history.",
      festivals: "Sangai Festival."
    }
  },
  {
    name: "Loktak Lake",
    city: "Moirang",
    state: "Manipur",
    description: "The largest freshwater lake in Northeast India, famous for its phumdis (floating islands).",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Loktak_Lake_Manipur.jpg/200px-Loktak_Lake_Manipur.jpg",
    lat: 24.4983,
    lng: 93.8037,
    details: {
      history: "A vital part of Manipur's ecology and economy.",
      significance: "Home to the endangered Sangai deer.",
      festivals: "Loktak Day and Sangai Festival."
    }
  },
  {
    name: "Shree Govindajee Temple",
    city: "Imphal",
    state: "Manipur",
    description: "A historic Vaishnavite temple and major pilgrimage site.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Shree_Govindajee_Temple_Imphal.jpg/200px-Shree_Govindajee_Temple_Imphal.jpg",
    lat: 24.8081,
    lng: 93.9442,
    details: {
      history: "Built in the 19th century by Maharaja Nara Singh.",
      significance: "A center of Manipuri religious and cultural life.",
      festivals: "Janmashtami and Rath Yatra."
    }
  },
  // Meghalaya
  {
    name: "Living Root Bridges",
    city: "Cherrapunji",
    state: "Meghalaya",
    description: "Unique bridges made from the aerial roots of rubber trees, a marvel of bioengineering.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Living_Root_Bridge_Meghalaya.jpg/200px-Living_Root_Bridge_Meghalaya.jpg",
    lat: 25.2986,
    lng: 91.5822,
    details: {
      history: "Created by the Khasi and Jaintia tribes over centuries.",
      significance: "A symbol of sustainable living and indigenous knowledge.",
      festivals: "Local eco-festivals."
    }
  },
  {
    name: "Umiam Lake",
    city: "Shillong",
    state: "Meghalaya",
    description: "A scenic reservoir north of Shillong, popular for water sports and picnics.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Umiam_Lake_Meghalaya.jpg/200px-Umiam_Lake_Meghalaya.jpg",
    lat: 25.6500,
    lng: 91.9000,
    details: {
      history: "Created by damming the Umiam River in the 1960s.",
      significance: "A major tourist attraction and water source.",
      festivals: "Water sports festivals."
    }
  },
  {
    name: "Nartiang Monoliths",
    city: "Nartiang",
    state: "Meghalaya",
    description: "A collection of ancient monoliths, believed to be the tallest in the world.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nartiang_Monoliths_Meghalaya.jpg/200px-Nartiang_Monoliths_Meghalaya.jpg",
    lat: 25.6667,
    lng: 92.1500,
    details: {
      history: "Erected by the Jaintia kings between 1500-1835 CE.",
      significance: "A site of historical and archaeological importance.",
      festivals: "Behdeinkhlam Festival."
    }
  },
  // Mizoram
  {
    name: "Solomon's Temple",
    city: "Aizawl",
    state: "Mizoram",
    description: "A large church and architectural landmark in Aizawl.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Solomons_Temple_Aizawl.jpg/200px-Solomons_Temple_Aizawl.jpg",
    lat: 23.7367,
    lng: 92.7146,
    details: {
      history: "Built by the Kohhran Thianghlim religious group, completed in 2017.",
      significance: "A major Christian pilgrimage and tourist site.",
      festivals: "Christmas and local church festivals."
    }
  },
  {
    name: "Reiek Tlang",
    city: "Reiek",
    state: "Mizoram",
    description: "A scenic mountain and popular trekking destination near Aizawl.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Reiek_Tlang_Mizoram.jpg/200px-Reiek_Tlang_Mizoram.jpg",
    lat: 23.7281,
    lng: 92.6022,
    details: {
      history: "A site of cultural festivals and traditional Mizo huts.",
      significance: "Offers panoramic views of the surrounding hills.",
      festivals: "Anthurium Festival."
    }
  },
  {
    name: "Phawngpui Blue Mountain National Park",
    city: "Phawngpui",
    state: "Mizoram",
    description: "The highest peak in Mizoram, known for its rich biodiversity.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Phawngpui_Blue_Mountain_Mizoram.jpg/200px-Phawngpui_Blue_Mountain_Mizoram.jpg",
    lat: 22.4833,
    lng: 93.0000,
    details: {
      history: "Declared a national park in 1992.",
      significance: "Home to rare flora and fauna, including the clouded leopard.",
      festivals: "Eco-tourism events."
    }
  },
  // Tripura
  {
    name: "Neermahal",
    city: "Melaghar",
    state: "Tripura",
    description: "A beautiful water palace built in the middle of Rudrasagar Lake, blending Hindu and Mughal architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Neermahal_Tripura.jpg/200px-Neermahal_Tripura.jpg",
    lat: 23.4872,
    lng: 91.2671,
    details: {
      history: "Constructed in 1930 by Maharaja Bir Bikram Kishore Manikya.",
      significance: "The only water palace in Eastern India, a major tourist attraction.",
      festivals: "Neermahal Water Festival."
    }
  },
  {
    name: "Ujjayanta Palace",
    city: "Agartala",
    state: "Tripura",
    description: "A former royal palace, now a museum showcasing the culture and history of Tripura.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ujjayanta_Palace_Tripura.jpg/200px-Ujjayanta_Palace_Tripura.jpg",
    lat: 23.8341,
    lng: 91.2820,
    details: {
      history: "Built in 1901 by Maharaja Radha Kishore Manikya.",
      significance: "A blend of Mughal, Roman, and British architecture.",
      festivals: "Durga Puja and other cultural events."
    }
  },
  {
    name: "Unakoti",
    city: "Unakoti",
    state: "Tripura",
    description: "An ancient Shaivite pilgrimage site with massive rock-cut carvings and sculptures.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Unakoti_Tripura.jpg/200px-Unakoti_Tripura.jpg",
    lat: 24.3657,
    lng: 92.0046,
    details: {
      history: "The carvings date back to the 7th–9th centuries CE.",
      significance: "Known as the 'Angkor Wat of the Northeast'.",
      festivals: "Ashokastami Mela."
    }
  },
  // Sikkim
  {
    name: "Rumtek Monastery",
    city: "Rumtek",
    state: "Sikkim",
    description: "The largest monastery in Sikkim and the seat of the Karmapa of the Kagyu sect of Tibetan Buddhism.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Rumtek_Monastery_Sikkim.jpg/200px-Rumtek_Monastery_Sikkim.jpg",
    lat: 27.3333,
    lng: 88.6167,
    details: {
      history: "Originally built in the 16th century, rebuilt in the 20th century.",
      significance: "A major center for Buddhist learning and culture.",
      festivals: "Drupka Teshi, Losar."
    }
  },
  {
    name: "Pemayangtse Monastery",
    city: "Pelling",
    state: "Sikkim",
    description: "One of the oldest and most important monasteries in Sikkim, known for its ancient relics and statues.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pemayangtse_Monastery_Sikkim.jpg/200px-Pemayangtse_Monastery_Sikkim.jpg",
    lat: 27.3000,
    lng: 88.2333,
    details: {
      history: "Founded in 1705 by Lama Lhatsun Chempo.",
      significance: "A key monastery of the Nyingma order of Tibetan Buddhism.",
      festivals: "Cham Dance Festival."
    }
  },
  {
    name: "Tsomgo Lake",
    city: "East Sikkim",
    state: "Sikkim",
    description: "A glacial lake located at an altitude of 3,753 m, surrounded by snow-capped mountains.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tsomgo_Lake_Sikkim.jpg/200px-Tsomgo_Lake_Sikkim.jpg",
    lat: 27.3750,
    lng: 88.7500,
    details: {
      history: "A sacred lake for the local Sikkimese people.",
      significance: "A popular tourist destination, especially in winter.",
      festivals: "Losar and other local festivals."
    }
  },
  // Andaman and Nicobar Islands
  {
    name: "Cellular Jail",
    city: "Port Blair",
    state: "Andaman and Nicobar Islands",
    description: "A colonial prison used by the British to exile political prisoners, now a national memorial.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cellular_Jail_Andaman.jpg/200px-Cellular_Jail_Andaman.jpg",
    lat: 11.6721,
    lng: 92.7654,
    details: {
      history: "Built between 1896 and 1906, infamous for its inhumane conditions.",
      significance: "A symbol of India's freedom struggle.",
      festivals: "Light and Sound Show."
    }
  },
  {
    name: "Radhanagar Beach",
    city: "Havelock Island",
    state: "Andaman and Nicobar Islands",
    description: "One of Asia's best beaches, known for its white sand and turquoise waters.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Radhanagar_Beach_Andaman.jpg/200px-Radhanagar_Beach_Andaman.jpg",
    lat: 11.9670,
    lng: 92.9847,
    details: {
      history: "A popular tourist destination, awarded as Asia's best beach by Time magazine.",
      significance: "Famous for sunsets and water sports.",
      festivals: "Beach festivals and eco-events."
    }
  },
  {
    name: "Ross Island",
    city: "Port Blair",
    state: "Andaman and Nicobar Islands",
    description: "Once the administrative headquarters of the British, now a historical ruin with colonial buildings.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ross_Island_Andaman.jpg/200px-Ross_Island_Andaman.jpg",
    lat: 11.6670,
    lng: 92.7630,
    details: {
      history: "Abandoned after an earthquake in 1941, now a tourist attraction.",
      significance: "Showcases colonial architecture and history.",
      festivals: "Light and Sound Show."
    }
  },
  // Chandigarh
  {
    name: "Rock Garden",
    city: "Chandigarh",
    state: "Chandigarh",
    description: "A unique garden made from industrial & home waste, created by Nek Chand.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Rock_Garden_Chandigarh.jpg/200px-Rock_Garden_Chandigarh.jpg",
    lat: 30.7522,
    lng: 76.8100,
    details: {
      history: "Started in 1957, now a sprawling 40-acre garden.",
      significance: "A symbol of creativity and recycling.",
      festivals: "Cultural events and art festivals."
    }
  },
  {
    name: "Sukhna Lake",
    city: "Chandigarh",
    state: "Chandigarh",
    description: "A man-made reservoir at the foothills of the Himalayas, popular for boating and leisure.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sukhna_Lake_Chandigarh.jpg/200px-Sukhna_Lake_Chandigarh.jpg",
    lat: 30.7421,
    lng: 76.8188,
    details: {
      history: "Created in 1958 by damming the Sukhna Choe stream.",
      significance: "A major recreational spot in the city.",
      festivals: "Sukhna Lake Festival."
    }
  },
  {
    name: "Capitol Complex",
    city: "Chandigarh",
    state: "Chandigarh",
    description: "A UNESCO World Heritage Site, designed by Le Corbusier, housing government buildings.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Capitol_Complex_Chandigarh.jpg/200px-Capitol_Complex_Chandigarh.jpg",
    lat: 30.7525,
    lng: 76.8000,
    details: {
      history: "Constructed in the 1950s as part of Chandigarh's master plan.",
      significance: "An architectural marvel and symbol of modern India.",
      festivals: "Heritage walks and architecture tours."
    }
  },
  // Dadra and Nagar Haveli and Daman and Diu
  {
    name: "Diu Fort",
    city: "Diu",
    state: "Dadra and Nagar Haveli and Daman and Diu",
    description: "A massive fort built by the Portuguese in the 16th century, overlooking the Arabian Sea.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Diu_Fort_Daman_Diu.jpg/200px-Diu_Fort_Daman_Diu.jpg",
    lat: 20.7141,
    lng: 70.9906,
    details: {
      history: "Built in 1535, a symbol of Portuguese colonial power.",
      significance: "A major tourist attraction and historical site.",
      festivals: "Diu Festival."
    }
  },
  {
    name: "St. Paul's Church",
    city: "Diu",
    state: "Dadra and Nagar Haveli and Daman and Diu",
    description: "A 17th-century church, an example of Baroque architecture in India.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/St_Pauls_Church_Diu.jpg/200px-St_Pauls_Church_Diu.jpg",
    lat: 20.7131,
    lng: 70.9876,
    details: {
      history: "Built in 1601 by the Portuguese.",
      significance: "Known for its intricate woodwork and architecture.",
      festivals: "Feast of St. Paul."
    }
  },
  {
    name: "Jampore Beach",
    city: "Daman",
    state: "Dadra and Nagar Haveli and Daman and Diu",
    description: "A serene beach known for its black sand and water sports.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jampore_Beach_Daman.jpg/200px-Jampore_Beach_Daman.jpg",
    lat: 20.3974,
    lng: 72.8328,
    details: {
      history: "A popular spot for locals and tourists alike.",
      significance: "Famous for its sunsets and beach activities.",
      festivals: "Beach festivals and kite flying events."
    }
  },
  // Lakshadweep
  {
    name: "Agatti Island",
    city: "Agatti",
    state: "Lakshadweep",
    description: "A coral island known for its turquoise lagoon and water sports.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Agatti_Island_Lakshadweep.jpg/200px-Agatti_Island_Lakshadweep.jpg",
    lat: 10.8393,
    lng: 72.1760,
    details: {
      history: "A major tourist destination in Lakshadweep.",
      significance: "Famous for snorkeling, scuba diving, and coral reefs.",
      festivals: "Beach festivals and local events."
    }
  },
  {
    name: "Kavaratti Mosque",
    city: "Kavaratti",
    state: "Lakshadweep",
    description: "A beautiful mosque known for its wood carvings and architecture.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Kavaratti_Mosque_Lakshadweep.jpg/200px-Kavaratti_Mosque_Lakshadweep.jpg",
    lat: 10.5667,
    lng: 72.6420,
    details: {
      history: "Built in the 17th century, a major religious site for locals.",
      significance: "Known for its ornate ceiling carvings.",
      festivals: "Eid and other Islamic festivals."
    }
  },
  {
    name: "Bangaram Island",
    city: "Bangaram",
    state: "Lakshadweep",
    description: "A picturesque island popular for its clear waters and coral reefs.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bangaram_Island_Lakshadweep.jpg/200px-Bangaram_Island_Lakshadweep.jpg",
    lat: 10.9442,
    lng: 72.2842,
    details: {
      history: "A top destination for eco-tourism and water sports.",
      significance: "Famous for its biodiversity and marine life.",
      festivals: "Beach festivals and eco-events."
    }
  },
  // Puducherry
  {
    name: "Auroville",
    city: "Auroville",
    state: "Puducherry",
    description: "An international township devoted to human unity, known for the Matrimandir meditation center.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Auroville_Puducherry.jpg/200px-Auroville_Puducherry.jpg",
    lat: 12.0066,
    lng: 79.8101,
    details: {
      history: "Founded in 1968 by Mirra Alfassa (The Mother).",
      significance: "A unique experiment in community and spirituality.",
      festivals: "Auroville birthday and cultural events."
    }
  },
  {
    name: "Promenade Beach",
    city: "Puducherry",
    state: "Puducherry",
    description: "A scenic beachfront in the heart of Puducherry, popular for walks and leisure.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Promenade_Beach_Puducherry.jpg/200px-Promenade_Beach_Puducherry.jpg",
    lat: 11.9360,
    lng: 79.8356,
    details: {
      history: "A favorite spot for locals and tourists.",
      significance: "Known for its sunrise views and French colonial ambiance.",
      festivals: "Beach festivals and cultural events."
    }
  },
  {
    name: "Sri Aurobindo Ashram",
    city: "Puducherry",
    state: "Puducherry",
    description: "A spiritual community and ashram founded by Sri Aurobindo and The Mother.",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sri_Aurobindo_Ashram_Puducherry.jpg/200px-Sri_Aurobindo_Ashram_Puducherry.jpg",
    lat: 11.9371,
    lng: 79.8355,
    details: {
      history: "Established in 1926, a center for yoga and spiritual practice.",
      significance: "A major spiritual destination in South India.",
      festivals: "Darshan days and spiritual events."
    }
  }
];

export default culturalPlaces;
