const unicodeCaseFold = {"µ":"μ","ß":"ss","ŉ":"ʼn","ſ":"s","ǰ":"ǰ","ͅ":"ι","ΐ":"ΐ","ΰ":"ΰ","ς":"σ","ϐ":"β","ϑ":"θ","ϕ":"φ","ϖ":"π","ϰ":"κ","ϱ":"ρ","ϵ":"ε","և":"եւ","Ꭰ":"Ꭰ","Ꭱ":"Ꭱ","Ꭲ":"Ꭲ","Ꭳ":"Ꭳ","Ꭴ":"Ꭴ","Ꭵ":"Ꭵ","Ꭶ":"Ꭶ","Ꭷ":"Ꭷ","Ꭸ":"Ꭸ","Ꭹ":"Ꭹ","Ꭺ":"Ꭺ","Ꭻ":"Ꭻ","Ꭼ":"Ꭼ","Ꭽ":"Ꭽ","Ꭾ":"Ꭾ","Ꭿ":"Ꭿ","Ꮀ":"Ꮀ","Ꮁ":"Ꮁ","Ꮂ":"Ꮂ","Ꮃ":"Ꮃ","Ꮄ":"Ꮄ","Ꮅ":"Ꮅ","Ꮆ":"Ꮆ","Ꮇ":"Ꮇ","Ꮈ":"Ꮈ","Ꮉ":"Ꮉ","Ꮊ":"Ꮊ","Ꮋ":"Ꮋ","Ꮌ":"Ꮌ","Ꮍ":"Ꮍ","Ꮎ":"Ꮎ","Ꮏ":"Ꮏ","Ꮐ":"Ꮐ","Ꮑ":"Ꮑ","Ꮒ":"Ꮒ","Ꮓ":"Ꮓ","Ꮔ":"Ꮔ","Ꮕ":"Ꮕ","Ꮖ":"Ꮖ","Ꮗ":"Ꮗ","Ꮘ":"Ꮘ","Ꮙ":"Ꮙ","Ꮚ":"Ꮚ","Ꮛ":"Ꮛ","Ꮜ":"Ꮜ","Ꮝ":"Ꮝ","Ꮞ":"Ꮞ","Ꮟ":"Ꮟ","Ꮠ":"Ꮠ","Ꮡ":"Ꮡ","Ꮢ":"Ꮢ","Ꮣ":"Ꮣ","Ꮤ":"Ꮤ","Ꮥ":"Ꮥ","Ꮦ":"Ꮦ","Ꮧ":"Ꮧ","Ꮨ":"Ꮨ","Ꮩ":"Ꮩ","Ꮪ":"Ꮪ","Ꮫ":"Ꮫ","Ꮬ":"Ꮬ","Ꮭ":"Ꮭ","Ꮮ":"Ꮮ","Ꮯ":"Ꮯ","Ꮰ":"Ꮰ","Ꮱ":"Ꮱ","Ꮲ":"Ꮲ","Ꮳ":"Ꮳ","Ꮴ":"Ꮴ","Ꮵ":"Ꮵ","Ꮶ":"Ꮶ","Ꮷ":"Ꮷ","Ꮸ":"Ꮸ","Ꮹ":"Ꮹ","Ꮺ":"Ꮺ","Ꮻ":"Ꮻ","Ꮼ":"Ꮼ","Ꮽ":"Ꮽ","Ꮾ":"Ꮾ","Ꮿ":"Ꮿ","Ᏸ":"Ᏸ","Ᏹ":"Ᏹ","Ᏺ":"Ᏺ","Ᏻ":"Ᏻ","Ᏼ":"Ᏼ","Ᏽ":"Ᏽ","ᏸ":"Ᏸ","ᏹ":"Ᏹ","ᏺ":"Ᏺ","ᏻ":"Ᏻ","ᏼ":"Ᏼ","ᏽ":"Ᏽ","ᲀ":"в","ᲁ":"д","ᲂ":"о","ᲃ":"с","ᲄ":"т","ᲅ":"т","ᲆ":"ъ","ᲇ":"ѣ","ᲈ":"ꙋ","ẖ":"ẖ","ẗ":"ẗ","ẘ":"ẘ","ẙ":"ẙ","ẚ":"aʾ","ẛ":"ṡ","ẞ":"ss","ὐ":"ὐ","ὒ":"ὒ","ὔ":"ὔ","ὖ":"ὖ","ᾀ":"ἀι","ᾁ":"ἁι","ᾂ":"ἂι","ᾃ":"ἃι","ᾄ":"ἄι","ᾅ":"ἅι","ᾆ":"ἆι","ᾇ":"ἇι","ᾈ":"ἀι","ᾉ":"ἁι","ᾊ":"ἂι","ᾋ":"ἃι","ᾌ":"ἄι","ᾍ":"ἅι","ᾎ":"ἆι","ᾏ":"ἇι","ᾐ":"ἠι","ᾑ":"ἡι","ᾒ":"ἢι","ᾓ":"ἣι","ᾔ":"ἤι","ᾕ":"ἥι","ᾖ":"ἦι","ᾗ":"ἧι","ᾘ":"ἠι","ᾙ":"ἡι","ᾚ":"ἢι","ᾛ":"ἣι","ᾜ":"ἤι","ᾝ":"ἥι","ᾞ":"ἦι","ᾟ":"ἧι","ᾠ":"ὠι","ᾡ":"ὡι","ᾢ":"ὢι","ᾣ":"ὣι","ᾤ":"ὤι","ᾥ":"ὥι","ᾦ":"ὦι","ᾧ":"ὧι","ᾨ":"ὠι","ᾩ":"ὡι","ᾪ":"ὢι","ᾫ":"ὣι","ᾬ":"ὤι","ᾭ":"ὥι","ᾮ":"ὦι","ᾯ":"ὧι","ᾲ":"ὰι","ᾳ":"αι","ᾴ":"άι","ᾶ":"ᾶ","ᾷ":"ᾶι","ᾼ":"αι","ι":"ι","ῂ":"ὴι","ῃ":"ηι","ῄ":"ήι","ῆ":"ῆ","ῇ":"ῆι","ῌ":"ηι","ῒ":"ῒ","ΐ":"ΐ","ῖ":"ῖ","ῗ":"ῗ","ῢ":"ῢ","ΰ":"ΰ","ῤ":"ῤ","ῦ":"ῦ","ῧ":"ῧ","ῲ":"ὼι","ῳ":"ωι","ῴ":"ώι","ῶ":"ῶ","ῷ":"ῶι","ῼ":"ωι","ꭰ":"Ꭰ","ꭱ":"Ꭱ","ꭲ":"Ꭲ","ꭳ":"Ꭳ","ꭴ":"Ꭴ","ꭵ":"Ꭵ","ꭶ":"Ꭶ","ꭷ":"Ꭷ","ꭸ":"Ꭸ","ꭹ":"Ꭹ","ꭺ":"Ꭺ","ꭻ":"Ꭻ","ꭼ":"Ꭼ","ꭽ":"Ꭽ","ꭾ":"Ꭾ","ꭿ":"Ꭿ","ꮀ":"Ꮀ","ꮁ":"Ꮁ","ꮂ":"Ꮂ","ꮃ":"Ꮃ","ꮄ":"Ꮄ","ꮅ":"Ꮅ","ꮆ":"Ꮆ","ꮇ":"Ꮇ","ꮈ":"Ꮈ","ꮉ":"Ꮉ","ꮊ":"Ꮊ","ꮋ":"Ꮋ","ꮌ":"Ꮌ","ꮍ":"Ꮍ","ꮎ":"Ꮎ","ꮏ":"Ꮏ","ꮐ":"Ꮐ","ꮑ":"Ꮑ","ꮒ":"Ꮒ","ꮓ":"Ꮓ","ꮔ":"Ꮔ","ꮕ":"Ꮕ","ꮖ":"Ꮖ","ꮗ":"Ꮗ","ꮘ":"Ꮘ","ꮙ":"Ꮙ","ꮚ":"Ꮚ","ꮛ":"Ꮛ","ꮜ":"Ꮜ","ꮝ":"Ꮝ","ꮞ":"Ꮞ","ꮟ":"Ꮟ","ꮠ":"Ꮠ","ꮡ":"Ꮡ","ꮢ":"Ꮢ","ꮣ":"Ꮣ","ꮤ":"Ꮤ","ꮥ":"Ꮥ","ꮦ":"Ꮦ","ꮧ":"Ꮧ","ꮨ":"Ꮨ","ꮩ":"Ꮩ","ꮪ":"Ꮪ","ꮫ":"Ꮫ","ꮬ":"Ꮬ","ꮭ":"Ꮭ","ꮮ":"Ꮮ","ꮯ":"Ꮯ","ꮰ":"Ꮰ","ꮱ":"Ꮱ","ꮲ":"Ꮲ","ꮳ":"Ꮳ","ꮴ":"Ꮴ","ꮵ":"Ꮵ","ꮶ":"Ꮶ","ꮷ":"Ꮷ","ꮸ":"Ꮸ","ꮹ":"Ꮹ","ꮺ":"Ꮺ","ꮻ":"Ꮻ","ꮼ":"Ꮼ","ꮽ":"Ꮽ","ꮾ":"Ꮾ","ꮿ":"Ꮿ","ﬀ":"ff","ﬁ":"fi","ﬂ":"fl","ﬃ":"ffi","ﬄ":"ffl","ﬅ":"st","ﬆ":"st","ﬓ":"մն","ﬔ":"մե","ﬕ":"մի","ﬖ":"վն","ﬗ":"մխ"};
const coverPreviews = {
  "images/1761398510024-372984475.jpg": "images/previews/f35420600c32fb6008d2e5056604fc1da233c9ce66f0587cd860035ad9c859a2.webp",
  "images/1761400415580-759445574.jpg": "images/previews/5cbe59a8ec1835c11ee4cebe85faa67853b40d2f3e8bd5a12b334fd1e3d1641d.webp",
  "images/1761403952317-158559985.jpeg": "images/previews/779c24338c4cdb9ff9cf19570ab3ef42184b3c9a0c42508063928b5d9dcd478a.webp",
  "images/1761404603802-752593418.jpg": "images/previews/73cbea3ef369615915a05c103cfa67a1ed14e08751d9f755fb587c664b9e5ec4.webp",
  "images/1761405050230-345540963.jpg": "images/previews/a409bf2ff1e7e5f8fd1fceac127cdf5fbf8681b0681a45d478e268dd8168b1ca.webp",
  "images/1761409071145-377159670.jpg": "images/previews/f7200e81ed08d4168931ea6ed9aafaf63b44dff27c74a0685aa3ca6f00ac9cfa.webp",
  "images/1761410241240-46984163.jpeg": "images/previews/dc34e54cc8308b1df2e9da2c42358ddb5bb0a3011b978861af6c885ad9c2d048.webp",
  "images/1761410751906-450198204.jpeg": "images/previews/dc34e54cc8308b1df2e9da2c42358ddb5bb0a3011b978861af6c885ad9c2d048.webp",
  "images/1761410948391-644646746.jpg": "images/previews/2a864e87cb95aeb1d21cd807222c3be2d16ad5f6b7e2d99ed557a24642a2cf8e.webp",
  "images/1761495769429-702589751.jpg": "images/previews/3ce920e3bc9b3aca5f205623aa542bcee7dfa7deee455d7d35843082008640a5.webp",
  "images/1761497627493-592594290.jpg": "images/previews/69ff244dd21402206fdfa5be68a56f19005d2fd4164cedd4ac2373ec0817a01b.webp",
  "images/1761544590823-412649225.jpg": "images/previews/69ff244dd21402206fdfa5be68a56f19005d2fd4164cedd4ac2373ec0817a01b.webp",
  "images/1761565779681-471437153.jpg": "images/previews/7edf7ddca20529817294924a460737b1a159571a09e804d879aa68835ef20d80.webp",
  "images/1761566727091-289871404.jpg": "images/previews/7edf7ddca20529817294924a460737b1a159571a09e804d879aa68835ef20d80.webp",
  "images/1761566893258-815064893.jpg": "images/previews/4c80ae4b361f2a9194f36c1081553e2e0b165abd20a4e69deac7a8ab5847cfec.webp",
  "images/1761567286685-621469619.jpg": "images/previews/cb98c60517c617eae9b4404117111445844a5af14dba5d753e447052971b1e83.webp",
  "images/1761567896369-16710674.jpg": "images/previews/3d60a478ba03e00bd726d25f3a05648490e3d3e08b1a20d527164501c86c407a.webp",
  "images/1761568099861-700068373.jpg": "images/previews/44a7a4e5dd2a08d9fe4cf713aca186d78b2b020f5149a1360a4243a59ed546d5.webp",
  "images/1761568531861-414869412.jpg": "images/previews/69ff244dd21402206fdfa5be68a56f19005d2fd4164cedd4ac2373ec0817a01b.webp",
  "images/1761569938483-591395772.jpg": "images/previews/d3f49cc4d8c18da91bdef97bae9db45956fc833ba6fd94f047b180a0d4cdc327.webp",
  "images/1761573738596-125630052.jpg": "images/previews/3a488d6e8997d50923b900c28718482e43059a4f710fdee1b0d899bb4602b05e.webp",
  "images/1761573843670-943415105.jpg": "images/previews/31a172ea8bf424326d39824233d91e9864d4f9a8e3632593597b77249e27edb9.webp",
  "images/1761573989902-219877829.jpg": "images/previews/04f3a0e660b5884415b4125b63d1d8b8776cfec7825858ee2eeddf9d70d0fbfc.webp",
  "images/1761574071525-305093232.jpg": "images/previews/95524d70c6d113d38601af36e7ae82b76f3e7c85ee4df1cc6b62c508dc690ae6.webp",
  "images/1761574179185-980205482.jpg": "images/previews/5ab8e991a4be42d24d59d9f8559daebcb4aec68c00ac94814d26396b29fc5d05.webp",
  "images/1761575321715-583468607.jpg": "images/previews/ff1485513d88c94068b81a55b99948b39d584e15c922acc458b22def307acf11.webp",
  "images/1761575536928-306260670.jpg": "images/previews/a409bf2ff1e7e5f8fd1fceac127cdf5fbf8681b0681a45d478e268dd8168b1ca.webp",
  "images/1761575714109-832438595.jpg": "images/previews/ffab20614d87f5c7e33068084861c04a72e87cd927bfa1ab2b34652aa5a53cbf.webp",
  "images/1761575963603-826952981.jpg": "images/previews/2e5595ac3a3b0e0f3f3b3ecce0f8b355107fd3eb4174fef054726448d0bd4243.webp",
  "images/1761576346393-629474637.jpg": "images/previews/5c460b643f466d590ecf62f0bd03c0bfc6147695ceb0c3f2fc210aa03270def6.webp",
  "images/1761576538304-396815668.jpg": "images/previews/28738656ba766562896e2d2d8c9aa1dffb3d1cd555e5f35136f171f208290050.webp",
  "images/1761576678288-913854501.jpg": "images/previews/f940ee3abab25d416c55d491f9916984183f8d4bb87cbc582c6e0de3b22feb4f.webp",
  "images/1761577216451-288772802.jpg": "images/previews/09cdd7ef8419cfbc887a85e81587c52b1feb634e8ee14672a501cb347aedc566.webp",
  "images/1761577478384-938799410.jpg": "images/previews/90d1b76a8f5c2e133a8ad345859994c8b357c0736af2090007fac3673777f5c8.webp",
  "images/1761577583214-358197675.jpg": "images/previews/f665c1b829f732ea76fc54e4040749ed81b138c5fb29cb3203f84113cf4ee67a.webp",
  "images/1761577758259-232671209.jpg": "images/previews/f814dada6b8705f4e7ef9a7697f61ddddca34a32b44c48377e4e8d9e52b3a8a5.webp",
  "images/1761577977167-751466349.jpg": "images/previews/f0a2d1ff9a61df8ca7ea1599412334302c2e4454f90c68f550115049fff477b9.webp",
  "images/1761578643742-838585755.jpg": "images/previews/6fabf4caac50f429053448ce577c90ccaa6cfa83241cd361956abb38a8d49a7f.webp",
  "images/1761578888652-844477392.jpg": "images/previews/c3717f5503e1186fb4b22db9074f430fc9e73b1b17e33a9776bf281c6ccbdd44.webp",
  "images/1761622045504-80349972.jpg": "images/previews/d212ad1569f0ab44939445a5e25531e98b3a8ae920091172ec242b00349348ad.webp",
  "images/1761622625030-228330015.jpg": "images/previews/7ada14fd8f642327575fdd0f40e8aa41c004b5b16f5e40acdb6ea1c50419522d.webp",
  "images/1761623043750-987530925.jpg": "images/previews/3063437e4c42efc38b2df05e4c151472074265b9f6952f2e0c7f9f525b4b1b82.webp",
  "images/1761628950599-410778311.jpg": "images/previews/2b2c2dc7072fdf0a672b65e7d2ccb8000d72638244b128d9431d5736208c86d6.webp",
  "images/1761629134822-440244393.jpg": "images/previews/cdf183190d29ea2ec6b40a139751e55d1026154ca6d44159ccd655a5f6aeacfa.webp",
  "images/1761629289985-135113624.jpg": "images/previews/9f0f72016d06af9a0dc6dcbdab166de7edf4bfc44ab47d693528f216e6a94fc8.webp",
  "images/1761632721139-277432981.jpg": "images/previews/a7fb856ec3e01c2eb889d8d3b592abf4a95e25ce1e982c21631c127513a9aa77.webp",
  "images/1761676584782-601570671.jpg": "images/previews/2500ff2c5e1853a44c4be166cae84ab02d8a416824cbacfba5dff3418935f50f.webp",
  "images/1761677117264-305975713.jpg": "images/previews/7112cade796b3dd7202c19dbea37d73a05ad0fd3ed5750f436284747ddde2381.webp",
  "images/1761764921481-435253588.jpg": "images/previews/104f50f0a6864a44121a239c31ee98ae207625de4e4fc48aec59c953af204ef8.webp",
  "images/1761792692988-236944570.jpg": "images/previews/f2e5ce4827ddfe94022733d76181d8c81a9c0c57622ef09825fdfc7379bb0353.webp",
  "images/1761794366948-567284683.jpg": "images/previews/730757dcf5650f5cec94971d4d0a96e1b6b0923deb0d0fc37a1726b6f6cd7bff.webp",
  "images/1761794486412-361303095.jpg": "images/previews/6fabf4caac50f429053448ce577c90ccaa6cfa83241cd361956abb38a8d49a7f.webp",
  "images/1761794629499-316540195.jpg": "images/previews/36f819ba8cb7acbff14da8371e5f948c9aae15a55a5cefce32c447a4b0e005af.webp",
  "images/1761794799048-677661732.jpg": "images/previews/8cdadf8016ca820ef95a6f6bad3acc501a778db21660e6fbac5aa18650471981.webp",
  "images/1761795056128-152686460.jpg": "images/previews/f79f61917b270f1e1504c9b37f259f1eaeabda835a755918d3c87367ccce06f4.webp",
  "images/1761795259315-522336967.jpg": "images/previews/69a9b3e8c33bd05cb983f018351db894140c1b653ef637b2afbf6f5967c6b8e4.webp",
  "images/1761878313165-452628874.jpg": "images/previews/c69e9e8d166a2d340f40bf293f48df875d340dcd0c70018422d2e041578a2fb2.webp",
  "images/1761933498686-518854895.jpg": "images/previews/434583b453ccdb1b099bd4c29d885e5291105536237df1b4e3dbd4dc29717a9b.webp",
  "images/1761933673747-744711433.jpg": "images/previews/5aaa2f7eb2557289a1ebe8669334fa5f5f5c6380a19ceed64cd436bbc2ae6b23.webp",
  "images/1761933893048-154748335.jpg": "images/previews/a409bf2ff1e7e5f8fd1fceac127cdf5fbf8681b0681a45d478e268dd8168b1ca.webp",
  "images/1761983461198-216884814.jpg": "images/previews/a62a76b03fde8093ae5badad7096eaf25c5530c1f63192c25c0c843fe17b5744.webp",
  "images/1761986280374-274059455.jpg": "images/previews/86ff1397eb3e65b9f51a4a00787ca40aaaa3e6340e99c0e9e43b88a812fa63d7.webp",
  "images/1761986639820-329631942.jpg": "images/previews/627af9a737a17674135fd6efc2ce8c22049d4ae2fbc2c5fbe513edb944598076.webp",
  "images/1762012051213-476940204.jpg": "images/previews/034bf86ca2d631cb6d2b6adc9fc35ffdabc42c81c3f863d78da22993b3371c69.webp",
  "images/1762012358280-830334780.jpg": "images/previews/e966874f0d53a727ba00a2c52b1b048c736da3ff9232b50eb5646ca7d10e0124.webp",
  "images/1762012600918-687927499.jpeg": "images/previews/0026af018dee68e2e71e46c76205bb622b89cebb7081c9ec55706f693173c09a.webp",
  "images/1762012886323-707996943.jpg": "images/previews/9fb646b112b2e5d1a3bc7ecf973c47ddc0f91aedb7755691b2cca05f1aa0ec04.webp",
  "images/1762013044997-433304002.jpg": "images/previews/2b428c38a16061f354bfebc2e26ada8d6ba0511c022abd5e84f1b3ca90ed83bb.webp",
  "images/1762013182195-521732613.jpg": "images/previews/d92e43de4bb1667f598f71627d6f941d35f4c1036929d008e1c90177cc0e0425.webp",
  "images/1762013423276-130968665.jpg": "images/previews/ffab20614d87f5c7e33068084861c04a72e87cd927bfa1ab2b34652aa5a53cbf.webp",
  "images/1762013567150-829004817.jpg": "images/previews/8dabfd9dfddf36d20bb78f55de8f70262fab810d397791d44a0397d40ae08c56.webp",
  "images/1762699281124-293414299.jpg": "images/previews/29bd8c3722462cd48bfc91b41773d7e5a155ac1ebe07d024e70f6261a1d897ae.webp",
  "images/1762699849907-395467857.jpg": "images/previews/d1f95188d82f443bf780671cda19c5a774c163776d7eb2efbffacf320379e5ce.webp",
  "images/1762699948795-550758318.jpg": "images/previews/9e384a018d5898b4574a3fa096b29f24e3747831ddb26607cfdd8ce22a9faa48.webp",
  "images/1762700032208-88426351.jpg": "images/previews/15c2fd152df0ea6a8af48c1e436c003db76f89a574476bfda00ff43be41062bf.webp",
  "images/1762700253495-465986601.jpg": "images/previews/2a6b57db4c9e8f6105e5e49fda6b9e0085b8b079e413a14cdbcfa37c074e9d1d.webp",
  "images/1762701898208-173188961.jpg": "images/previews/3c8f874b1d1d3b28435e244553580a3ea6d53bc12d67c281738fd071eb37857b.webp",
  "images/1762702917173-481002346.jpg": "images/previews/3aeb5887229180b2b116b38ead0c12d225fe66ae0d60cebad0e016661ead8026.webp",
  "images/1762706934454-938502390.jpg": "images/previews/a44c1f3397aa43611f5e1c4da5d7285f0a95d73730442e56837e0bc5236ffc44.webp",
  "images/1762707029859-955536425.jpg": "images/previews/5890d99408418822a31d3de05a463949dd03d97d7c92003b88cd7683b54d47bf.webp",
  "images/1762707222554-191833044.jpg": "images/previews/f49bc289ec2047ea2d17f43623c805c66e3fcc841555211a4af6d170bcf0f9d4.webp",
  "images/1762707442857-795478589.jpg": "images/previews/a537144211d96b3a650b5a9918c33b8a9c0679b7558e7e76592a3b98a7cf97eb.webp",
  "images/1762707828737-42539470.jpg": "images/previews/879af5383666cb1476964803f280fa99e3a7744209c44b7a1d3b5600daa10c11.webp",
  "images/1762708022891-357546282.jpg": "images/previews/9f86ef968bc9766e683b2090cb2f501bf3a08207814857aa6d39d0978dfa5d0a.webp",
  "images/1762708147475-584469410.jpg": "images/previews/61a54ae852219592b8cf2eb35027bb6d84dcd9274d12c18a18773b5a24b78653.webp",
  "images/1762708486680-56749910.jpg": "images/previews/ffab20614d87f5c7e33068084861c04a72e87cd927bfa1ab2b34652aa5a53cbf.webp",
  "images/1762708856396-817425882.jpg": "images/previews/115fb9297d77a735cf5f044c5f558f3a68652dc7f842a3d827bbf053837953a4.webp",
  "images/1762709042072-464288790.jpg": "images/previews/baaabbc9eaac8c898b45f733385d778e1272ca5a5fe7ae3b29d3249b265fb0af.webp",
  "images/1763012036487-54685314.jpg": "images/previews/54757ae826178ea23ad9b4750a1c77001e9a6e75db879255da9dc597cdfeef8e.webp",
  "images/1763044662267-598176465.jpg": "images/previews/f526fb1163d3938a18663de4088b5ecb78d1dfb5f33054e7a4de1e0cd58facd9.webp",
  "images/1763044963593-21707126.jpg": "images/previews/6ad1eb5131c892df84a6045c640adeb25d15b3634fd0e82467517ad74c79e7ad.webp",
  "images/1763045094017-718153974.jpg": "images/previews/f526fb1163d3938a18663de4088b5ecb78d1dfb5f33054e7a4de1e0cd58facd9.webp",
  "images/1763045203077-330888617.jpg": "images/previews/7f4cf8086d5a2012f6a268966c686de81dbcabda8f73018cf0dc1e92316668d1.webp",
  "images/1763045851197-587538535.jpg": "images/previews/8ad5f3f6d3d5df2ba57382a6fa09797c1fe00c83da5fe54bb21831a37e7f53c3.webp",
  "images/1764123371597-624828335.jpg": "images/previews/f2e5ce4827ddfe94022733d76181d8c81a9c0c57622ef09825fdfc7379bb0353.webp",
  "images/1764123451981-462094065.jpg": "images/previews/6ad1eb5131c892df84a6045c640adeb25d15b3634fd0e82467517ad74c79e7ad.webp",
  "images/1764123537712-141043163.jpg": "images/previews/299ce3e49155c13ca853994bca26bec0f05bdc32c5348f60652bc7cbcd6b3ef1.webp",
  "images/1764123653682-440040605.jpg": "images/previews/7f4cf8086d5a2012f6a268966c686de81dbcabda8f73018cf0dc1e92316668d1.webp",
  "images/1764123715091-221047929.jpg": "images/previews/f526fb1163d3938a18663de4088b5ecb78d1dfb5f33054e7a4de1e0cd58facd9.webp",
  "images/1764123776245-853132078.jpg": "images/previews/f526fb1163d3938a18663de4088b5ecb78d1dfb5f33054e7a4de1e0cd58facd9.webp",
  "images/1764123836590-324687445.jpg": "images/previews/6b5ab725e7d7de9cdba44ee890402031187d350441202e23c7dbc4ccea185467.webp",
  "images/1764123901457-264932727.jpg": "images/previews/8cdadf8016ca820ef95a6f6bad3acc501a778db21660e6fbac5aa18650471981.webp",
  "images/1764123973007-72126747.jpg": "images/previews/a409bf2ff1e7e5f8fd1fceac127cdf5fbf8681b0681a45d478e268dd8168b1ca.webp",
  "images/1764124132823-734639517.jpg": "images/previews/57f3fb802f637a76c76e7be5ad94da818f7428cc26f8f5b72a95480273fe5b5c.webp",
  "images/1764124202574-765151790.jpg": "images/previews/f940ee3abab25d416c55d491f9916984183f8d4bb87cbc582c6e0de3b22feb4f.webp",
  "images/1764124293880-619302378.jpg": "images/previews/66d5c2160222c3a80e49f2b626846cee6af4fa3adb65df0963e057d825af13f8.webp",
  "images/1764124390212-885504574.jpg": "images/previews/36f819ba8cb7acbff14da8371e5f948c9aae15a55a5cefce32c447a4b0e005af.webp",
  "images/1764124459583-38353498.jpg": "images/previews/dbd95b1a7067aa5f7e545792d8259d9c73bed21caeadd8307443c348be62c016.webp",
  "images/1764124519583-932369950.jpg": "images/previews/9fb646b112b2e5d1a3bc7ecf973c47ddc0f91aedb7755691b2cca05f1aa0ec04.webp",
  "images/1764124586214-148354144.jpg": "images/previews/9fb646b112b2e5d1a3bc7ecf973c47ddc0f91aedb7755691b2cca05f1aa0ec04.webp",
  "images/1764124654760-549050841.jpg": "images/previews/8cdadf8016ca820ef95a6f6bad3acc501a778db21660e6fbac5aa18650471981.webp",
  "images/1764124722328-742728483.jpg": "images/previews/8cdadf8016ca820ef95a6f6bad3acc501a778db21660e6fbac5aa18650471981.webp",
  "images/1764124851260-120977661.jpg": "images/previews/c18c02dd12d1d64f7ec6a4003d1175bfd06380f7ffe302852fda630cca62d902.webp",
  "images/1764124962269-464327554.jpg": "images/previews/f7687dfc792b1fdd1adbac1e474583f99ae35b8f9d43d83b0b2dad64491db266.webp",
  "images/1764156495487-167623963.jpg": "images/previews/579009932c22188b06109bb83934197f14b02bbc6303648d102aef064cea46d1.webp",
  "images/1764176205074-777963343.jpg": "images/previews/253aea8e0fcbe9f241e1976ce2944002bbbe7021b6bcff31551f033ae426f858.webp",
  "images/1764176379091-772496982.jpg": "images/previews/29bd8c3722462cd48bfc91b41773d7e5a155ac1ebe07d024e70f6261a1d897ae.webp",
  "images/1764176591328-105700147.jpg": "images/previews/dd868034e9ccc3dc222df4c3e159bdfdb2a17210f752ca460ba80ee6e7ec829d.webp",
  "images/1764177674392-985761306.jpg": "images/previews/a3428abe460ac99858898bf3bfe34f152a1affac0c6f9c8e76246737ddd0cbe5.webp",
  "images/1764178558927-3934674.jpg": "images/previews/7f4cf8086d5a2012f6a268966c686de81dbcabda8f73018cf0dc1e92316668d1.webp",
  "images/1764178998115-199809989.jpg": "images/previews/9f5e4ba79c67c890b925b63785bfa9f43ee9b14a8cd38cbe3411c4a6af6fecbc.webp",
  "images/1764580743440-869234899.jpeg": "images/previews/85ba36573fb4ead8f258d95124d1aecef0a7eac5962c1ecd7893e8795fbdeb1e.webp",
  "images/1764695479734-94362212.jpg": "images/previews/b456e07359e210dda5760eee5c8ef0ac2f5f8c1dc00f99e110a19fe2f9aec0f0.webp",
  "images/1765778513710-307799232.jpg": "images/previews/af37bce0425e0784c4baaa76f351d3bac172ecb7caa1b61fb36f71946c9e0b20.webp",
  "images/1765779080077-626333556.jpg": "images/previews/4c0d73be8525b563da6d466e97f9e3e17d16726e6e3d00f2d7030dc8ee1ab577.webp",
  "images/1765781306727-892189238.jpg": "images/previews/cc85329b366fc47aae08ac804a3b2e6c91f8aaf47afd4ff3e002e5fcd91db920.webp",
  "images/1765781811567-52024056.jpg": "images/previews/5621ac96cf649d4f2cbe39ada3afed4cc33fd6758c8fba93abad9d55249232ef.webp",
  "images/1766760544176-107935208.jpg": "images/previews/95338a7afca2b422c5068c911ec0b00d2998a6190fd3afb77c96aa689d6d7b41.webp",
  "images/1766760639146-289438118.jpg": "images/previews/165b30d4151ece5677837f9ef6ae3b8bd9aacbc41e67466512bfcc5e96694c53.webp",
  "images/1770392802470-970699518.jpeg": "images/previews/1de209d9c127b96853cf301a9e12c630830f7c148a8a88ad6b1fbc6f40966327.webp",
  "images/500x500.jpg": "images/previews/590e3911ae16cc88c53b6bbc8116d684a2c94d56183aea422ac863a51ce66841.webp",
  "images/Capricorn_(album)_cover2.jpg": "images/previews/e230e0f1c8fa3b9040dafbf670939a25b7005636276c44a8927e728c1113841a.webp",
  "images/Jay_2003_ablum_cover.jpg": "images/previews/2c1e60b847268189dee544a97f29a0badd4fea97d9862c723c1526bafb42b04c.webp",
  "images/ab67616d00001e026fb90fd9a0c655fecc35f20d.jpeg": "images/previews/d9ad020b2edc6bf4aa03967aebf04d35b672598e1f8d8b68102dac30a4afe3f4.webp",
  "images/gray.jpg": "images/previews/220fad722e3f5e69ef2b8b0136967d866bace1db9f556a49eb780cfce5716b49.webp"
};
let appMode = 'loading';
let favoriteSaving = false;
let favoriteFocusReturn = null;
const searchState = Object.fromEntries(['songs','poems','classical','favorites'].map(kind => [kind,{query:'',language:''}]));
function normalizedSearch(value) {
  return Array.from(String(value ?? '').normalize('NFKC')).map(char => unicodeCaseFold[char] ?? char.toLowerCase()).join('').replace(/\s+/g,' ').trim();
}
function rowsFor(kind) {
  return {songs,poems,classical,favorites}[kind];
}
function filteredRows(kind) {
  const {query,language} = searchState[kind];
  const terms = normalizedSearch(query).split(' ').filter(Boolean);
  return rowsFor(kind).filter(row => {
    if (language && normalizedSearch(row.language) !== normalizedSearch(language)) return false;
    const haystack = normalizedSearch([row.title,row.creators,row.lyricist,row.composer,row.lyrics,row.translation,row.albums,row.language,row.genre,row.othername,row.notes,row.note,row.songTitle,row.songCreators].flat().filter(Boolean).join(' '));
    return terms.every(term => haystack.includes(term));
  });
}
function resultSummary(kind, count) {
  const summary = document.getElementById(`${kind}ResultCount`);
  if (summary) summary.textContent = `顯示 ${count} / ${rowsFor(kind).length} 項`;
}
function emptyResults(kind) {
  const hasFilter = searchState[kind].query.trim() || searchState[kind].language;
  return `<div class="search-empty"><p>${hasFilter ? '找不到符合條件的內容。試著換個關鍵字，或清除篩選。' : '這裡還沒有收藏內容。'}</p>${hasFilter ? `<button type="button" class="btn btn--secondary" data-clear-search="${kind}">清除篩選</button>` : ''}</div>`;
}
function renderCollection(kind) {
  ({songs:renderSongs,poems:renderPoems,classical:renderClassical,favorites:renderFavorites})[kind]();
  applyMutationAvailability();
}
function clearSearch(kind) {
  searchState[kind] = {query:'',language:''};
  const input = document.getElementById(`${kind}Search`);
  const language = document.getElementById(`${kind}LanguageFilter`);
  if (input) input.value = '';
  if (language) language.value = '';
  renderCollection(kind);
  input?.focus();
}
let searchBound = false;
function refreshLanguageOptions(kind) {
  const select = document.getElementById(`${kind}LanguageFilter`);
  if (!select) return;
  const languages = [...new Set(rowsFor(kind).map(row => row.language).filter(Boolean))].sort((a,b) => a.localeCompare(b,'zh-TW'));
  select.innerHTML = '<option value="">所有語言</option>' + languages.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
  if (!languages.includes(searchState[kind].language)) searchState[kind].language = '';
  select.value = searchState[kind].language;
}
function initializeSearch() {
  for (const kind of ['songs','poems']) refreshLanguageOptions(kind);
  if (searchBound) return;
  searchBound = true;
  for (const kind of Object.keys(searchState)) {
    const input = document.getElementById(`${kind}Search`);
    input?.addEventListener('input', () => {searchState[kind].query = input.value; renderCollection(kind);});
    const language = document.getElementById(`${kind}LanguageFilter`);
    language?.addEventListener('change', () => {searchState[kind].language = language.value; renderCollection(kind);});
  }
  document.addEventListener('click',event => {
    const button = event.target.closest('[data-clear-search]');
    if (button) clearSearch(button.dataset.clearSearch);
  });
}

function applyMutationAvailability() {
  const enabled = appMode === 'server';
  document.querySelectorAll('#uploadForm button[type=submit], #uploadPoemForm button[type=submit], #uploadClassicalForm button[type=submit], #favoriteSaveButton, [data-delete-song], [data-delete-favorite], [data-import-trigger], #importFileInput').forEach(element => {
    if (!element.closest('[aria-busy=true]')) element.disabled = !enabled;
    element.title = enabled ? '' : '此頁是唯讀預覽，新增或修改需使用 Verse server。';
  });
  document.querySelectorAll('[data-favorite-source]').forEach(element => {
    element.setAttribute('aria-disabled', String(!enabled));
    element.title = enabled ? '' : '唯讀預覽無法新增收藏';
  });
  const notice = document.getElementById('uploadModeNotice');
  if (notice) notice.hidden = enabled;
}
function setUploadStatus(status,message,error = false) {
  status.textContent = message;
  status.className = 'upload-status active';
  status.setAttribute('role',error ? 'alert' : 'status');
  status.dataset.state = error ? 'error' : 'success';
}
async function responseJson(response) {
  let result;
  try {result = await response.json();} catch {throw new Error('伺服器回應無法讀取，請稍後重試。');}
  if (!response.ok || result.success === false) throw new Error(result.error || '操作失敗，請稍後重試。');
  return result;
}
function replaceRecord(kind,record) {
  const list = rowsFor(kind);
  const index = list.findIndex(row => row.id === record.id);
  if (index < 0) list.push(record); else list[index] = record;
  refreshLanguageOptions(kind); renderCollection(kind); renderHomePage(); renderArtists();
}
function bindUploadForm(formId, endpoint, kind, responseKey, statusId, previewId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit',async event => {
    event.preventDefault();
    const status = document.getElementById(statusId);
    if (form.dataset.submitting === 'true') return;
    if (appMode !== 'server') return setUploadStatus(status,'唯讀預覽無法新增內容，請使用 Verse server。',true);
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const controls = [...form.elements].map(element => [element,element.disabled]);
    form.dataset.submitting = 'true'; form.setAttribute('aria-busy','true');
    controls.forEach(([element]) => {element.disabled = true;});
    setUploadStatus(status,'正在儲存，請稍候…');
    try {
      const result = await responseJson(await apiFetch(endpoint,{method:'POST',body:formData}));
      if (!result[responseKey]?.id) throw new Error('伺服器未回傳新增內容，請重新整理確認。');
      replaceRecord(kind,result[responseKey]);
      form.reset();
      const preview = document.getElementById(previewId);
      if (preview?.dataset.objectUrl) {URL.revokeObjectURL(preview.dataset.objectUrl); delete preview.dataset.objectUrl;}
      if (preview) preview.replaceChildren();
      setUploadStatus(status,result.message || '儲存成功！');
    } catch (error) {
      setUploadStatus(status,`儲存失敗：${error.message} 輸入內容已保留。`,true);
    } finally {
      delete form.dataset.submitting; form.removeAttribute('aria-busy');
      controls.forEach(([element,disabled]) => {element.disabled = disabled;});
      applyMutationAvailability();
    }
  });
  form.addEventListener('reset',() => {
    const preview = document.getElementById(previewId);
    if (preview?.dataset.objectUrl) {URL.revokeObjectURL(preview.dataset.objectUrl); delete preview.dataset.objectUrl;}
    preview?.replaceChildren();
    const status = document.getElementById(statusId);
    if (status) {status.textContent = '';status.className = 'upload-status';}
  });
}
function setMenuOpen(open, restoreFocus = false) {
  const nav = document.getElementById('nav');
  const button = document.getElementById('menuBtn');
  nav.classList.toggle('active',open);
  document.getElementById('overlay').classList.toggle('active',open);
  button.setAttribute('aria-expanded',String(open));
  if (open && window.innerWidth <= 768) nav.querySelector('a')?.focus();
  if (!open && restoreFocus) button.focus();
}
function trapFocus(event,container) {
  const focusable = [...container.querySelectorAll('a[href]:not([aria-disabled=true]), button:not(:disabled), input:not([type=hidden]):not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex="0"]')].filter(element => element.getClientRects().length);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable.at(-1);
  if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {event.preventDefault(); last.focus();}
  else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {event.preventDefault(); first.focus();}
}
function setBackgroundInert(inert) {
  for (const element of document.querySelectorAll('header, main > *, body > .big-post-arrow')) {
    if (element.id !== 'favoriteModal' && !element.contains(document.getElementById('favoriteModal'))) element.inert = inert;
  }
}
function downloadCollection(data, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url),1000);
}
document.addEventListener('keydown',event => {
  const modal = document.getElementById('favoriteModal');
  if (modal.classList.contains('active')) {
    if (event.key === 'Tab') trapFocus(event,modal);
    if (event.key === 'Escape' && !favoriteSaving) closeFavoriteModal();
    return;
  }
  if (window.innerWidth <= 768 && document.getElementById('nav').classList.contains('active')) {
    if (event.key === 'Tab') trapFocus(event,document.querySelector('header'));
    if (event.key === 'Escape') setMenuOpen(false,true);
  }
});
window.addEventListener('resize',() => {if (window.innerWidth > 768) setMenuOpen(false);});

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function safeImage(value) {
  return escapeHtml(/^images\/[A-Za-z0-9_.()-]+\.(?:jpe?g|png|gif|webp)$/i.test(value || "") ? value : "images/gray.jpg");
}
function coverImage(value, alt) {
  const original = safeImage(value || 'images/gray.jpg');
  const preview = coverPreviews[original];
  return `<img src="${preview || original}"${preview ? ` data-original-src="${original}"` : ''} alt="${escapeHtml(alt)}" loading="lazy" decoding="async" width="56" height="56">`;
}
document.addEventListener('error', event => {
  const img = event.target;
  if (!(img instanceof HTMLImageElement) || img.dataset.uploadPreview) return;
  if (img.dataset.originalSrc && !img.dataset.previewFallback) {img.dataset.previewFallback = 'true';img.src = img.dataset.originalSrc;return;}
  if (img.dataset.fallbackAttempted || img.getAttribute('src') === 'images/gray.jpg') return;
  img.dataset.fallbackAttempted = 'true';
  img.src = new URL('images/gray.jpg', document.baseURI).href;
}, true);

async function apiFetch(url, options = {}) {
  const headers = new Headers(options.headers);
  if (options.method && options.method.toUpperCase() !== 'GET') {
    if (appMode !== 'server') throw new Error('唯讀預覽無法修改收藏，請使用 Verse server。');
    headers.set('X-Verse-Request','1');
  }
  const controller = new AbortController();
  const externalSignal = options.signal;
  const abort = () => controller.abort();
  if (externalSignal?.aborted) abort();
  else externalSignal?.addEventListener('abort',abort,{once:true});
  let timedOut = false;
  const timer = setTimeout(() => {timedOut = true;controller.abort();},30000);
  try {
    const response = await fetch(url,{...options,headers,signal:controller.signal});
    // Keep the deadline active while receiving the body, not just the headers.
    const bytes = await response.arrayBuffer();
    const body = [204,205,304].includes(response.status) ? null : bytes;
    return new Response(body,{status:response.status,statusText:response.statusText,headers:response.headers});
  } catch (error) {
    if (timedOut) throw new Error('連線等待超過 30 秒。若剛才送出了修改，請先重新整理確認結果，再決定是否重試。');
    throw error;
  } finally {clearTimeout(timer);externalSignal?.removeEventListener('abort',abort);}
}

function updateHash(value) {
  if (location.hash.slice(1) !== value) history.pushState(null, "", "#" + value);
}
function navigateToHash() {
  const [page, encodedId] = location.hash.slice(1).split("/");
  let value;
  try { value = decodeURIComponent(encodedId || ""); } catch { return showPage("home", false); }
  if (page === "song" || page === "poem") {
    if ((page === "song" ? songs : poems).some(item => item.id === value)) return showSongDetail(value, page, false);
  } else if (page === "classical" && value) {
    if (classical.some(item => item.id === value)) return showClassicalDetail(value, false);
  } else if (page === "artist" && value) return showArtistDetail(value, false);
  else if (document.getElementById(page)?.classList.contains("page") && !["songDetail","artistDetail"].includes(page)) return showPage(page, false);
  showPage("home", false);
}
window.addEventListener("hashchange", navigateToHash);
window.addEventListener("popstate", navigateToHash);
document.addEventListener('click', event => {
  if (event.target.closest('.skip-link')) {
    event.preventDefault();
    const main = document.getElementById('mainContent');
    main.focus();main.scrollIntoView({block:'start',behavior:'instant'});
    return;
  }
  const navigate = event.target.closest('[data-navigate]');
  if (navigate) {event.preventDefault(); showPage(navigate.dataset.navigate);}
  const action = event.target.closest('[data-action]');
  if (!action || action.disabled) return;
  const actions = {
    'menu-toggle':toggleMenu, 'panel-toggle':togglePanel,
    'favorite-close':closeFavoriteModal, 'favorite-save':saveFavorite,
    'view-data':viewLocalData, 'export-data':exportLocalData,
    'import-select':() => {if (appMode === 'server' && !importBusy) document.getElementById('importFileInput').click();},
    'import-confirm':executeImport, 'import-cancel':cancelImport,
    'import-close':closeImportDialog,
    'copy-detail-link':() => copyDetail('link'), 'copy-detail-text':() => copyDetail('text')
  };
  const handler = actions[action.dataset.action];
  if (handler) {event.preventDefault(); handler();}
});
document.addEventListener("click", event => {
  const detail = event.target.closest("[data-detail]");
  const deleteFavoriteButton = event.target.closest("[data-delete-favorite]");
  const favoriteDetail = event.target.closest("[data-favorite-detail]");
  if (detail) {
    if (detail.dataset.type === "classical") showClassicalDetail(detail.dataset.detail);
    else showSongDetail(detail.dataset.detail, detail.dataset.type);
  }
  if (deleteFavoriteButton && appMode === "server") deleteFavorite(deleteFavoriteButton.dataset.deleteFavorite);
  if (favoriteDetail) showFavoriteDetail(favoriteDetail.dataset.favoriteDetail);
  const artist = event.target.closest("[data-artist]");
  const favorite = event.target.closest("[data-favorite-source]");
  const remove = event.target.closest("[data-delete-song]");
  if (artist) showArtistDetail(artist.dataset.artist);
  if (favorite) {
    event.preventDefault();
    const item = [...songs,...poems].find(item => item.id === favorite.dataset.favoriteSource);
    if (item) openFavoriteModal(item.id,item.title,item.creators.join(", "));
  }
  if (remove && appMode === "server") deleteSong(remove.dataset.deleteSong);
});

function detailTools(kind, item) {
  return `<div id="detailTools" class="detail-tools" data-kind="${kind}" data-id="${escapeHtml(item.id)}"><div class="detail-tools-actions"><button type="button" class="btn btn--secondary" data-action="copy-detail-link">複製連結</button><button type="button" class="btn btn--secondary" data-action="copy-detail-text">複製內容</button></div><p class="detail-copy-status" role="status" aria-live="polite"></p><label class="detail-copy-fallback" hidden>複製文字<textarea readonly rows="4" aria-label="可手動複製的文字"></textarea></label></div>`;
}
async function copyDetail(mode) {
  const tools = document.getElementById('detailTools');
  if (!tools || tools.dataset.copying === 'true') return;
  const kind = tools.dataset.kind;
  const item = (kind === 'classical' ? classical : kind === 'song' ? songs : poems).find(row => row.id === tools.dataset.id);
  if (!item) return;
  const text = mode === 'link' ? location.href : (kind === 'classical' ? [item.title, item.composer.join(', '), item.notes || ''].join('\n') : item.lyrics);
  const status = tools.querySelector('.detail-copy-status');
  const fallback = tools.querySelector('.detail-copy-fallback');
  const buttons = [...tools.querySelectorAll('button')];
  tools.dataset.copying = 'true';buttons.forEach(button => {button.disabled = true;});
  status.textContent = '正在複製…';fallback.hidden = true;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    if (tools !== document.getElementById('detailTools')) return;
    status.textContent = mode === 'link' ? '連結已複製。' : '內容已複製。';
  } catch {
    if (tools !== document.getElementById('detailTools')) return;
    status.textContent = '瀏覽器未允許複製，請複製下方已選取的文字。';
    const input = fallback.querySelector('textarea');input.value = text;fallback.hidden = false;input.focus();input.select();
  } finally {delete tools.dataset.copying;buttons.forEach(button => {button.disabled = false;});}
}

// 歌曲資料
let songs = [];

// 詩詞資料
let poems = [];

let favorites = [];

let classical = [];

// 渲染歌曲列表
function renderSongs() {
  const songGrid = document.getElementById("songGrid");
  if (!songGrid) return;

  const sortByElement = document.getElementById("songSort");
  const sortOrderElement = document.getElementById("sortOrder");
  const sortBy = sortByElement ? sortByElement.value : "dateAdded";
  const sortOrder = sortOrderElement ? sortOrderElement.value : "desc"; // desc=遞減, asc=遞增

  let sortedSongs = filteredRows("songs");
  resultSummary("songs",sortedSongs.length);
  if (!sortedSongs.length) {songGrid.innerHTML = emptyResults("songs"); return;}

  switch (sortBy) {
    case "dateAdded":
      // 按加入日期排序（ID中的時間戳）
      sortedSongs.sort((a, b) => {
        const timeA = parseInt(a.id.replace("song", "")) || 0;
        const timeB = parseInt(b.id.replace("song", "")) || 0;
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
      console.log(
        `✅ 按加入日期${sortOrder === "desc" ? "遞減" : "遞增"}排序完成`
      );
      break;
    case "releaseDate":
      // 按發行日期排序 - 統一使用 release_date 欄位
      sortedSongs.sort((a, b) => {
        // 🔴 只使用 release_date 欄位，格式為 YYYY-MM-DD
        const dateA = new Date(a.release_date || "1900-01-01");
        const dateB = new Date(b.release_date || "1900-01-01");

        // 檢查日期是否有效
        if (isNaN(dateA.getTime())) {
          console.warn(
            `無效的發行日期 A: ${a.release_date} (歌曲: ${a.title})`
          );
          dateA.setFullYear(1900, 0, 1);
        }
        if (isNaN(dateB.getTime())) {
          console.warn(
            `無效的發行日期 B: ${b.release_date} (歌曲: ${b.title})`
          );
          dateB.setFullYear(1900, 0, 1);
        }

        // 根據排序方向返回結果
        return sortOrder === "desc"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });

      console.log(
        `✅ 按發行日期${sortOrder === "desc" ? "遞減" : "遞增"}排序完成`
      );
      break;

    case "alphabet":
      // 按字母排序
      sortedSongs.sort((a, b) => {
        const result = a.title.localeCompare(b.title, "zh-TW");
        return sortOrder === "desc" ? -result : result;
      });
      console.log(`✅ 按字母${sortOrder === "desc" ? "遞減" : "遞增"}排序完成`);
      break;

    default:
      console.log("✅ 使用預設排序");
  }

  songGrid.innerHTML = sortedSongs
    .map((song) => {
      const creators = song.creators ? song.creators.join(", ") : "";
      const lyricist = song.lyricist ? song.lyricist.join(", ") : "";
      const composer =
        song.composer && song.composer.length > 0
          ? song.composer.join(", ")
          : "";
      const albums = song.albums || "";

      return `
                <div class="song-card" data-detail="${escapeHtml(song.id)}" data-type="song" role="button" tabindex="0">
                    ${coverImage(song.image || "images/gray.jpg",song.title)}
                    <div class="song-card-content">
                        <div class="song-info">
                            <h3>${escapeHtml(song.title)}</h3>
                            <p class="creator">${escapeHtml(creators)}</p>
                            ${
                              albums
                                ? `<p class="album mobile-show">${escapeHtml(albums)}</p>`
                                : ""
                            }
                        </div>
                        
                        <div class="song-meta desktop-only">
                            ${
                              lyricist
                                ? `<div class="meta-item"><span class="meta-label">作詞：</span>${escapeHtml(lyricist)}</div>`
                                : ""
                            }
                            ${
                              composer
                                ? `<div class="meta-item"><span class="meta-label">作曲：</span>${escapeHtml(composer)}</div>`
                                : ""
                            }
                            ${
                              albums
                                ? `<div class="meta-item"><span class="meta-label">專輯：</span>${escapeHtml(albums)}</div>`
                                : ""
                            }
                        </div>
                        
                        <div class="song-tags">
                            ${
                              song.language
                                ? `<span class="tag tag--language">${escapeHtml(song.language)}</span>`
                                : ""
                            }
                            ${
                              song.genre
                                ? `<span class="tag tag--genre">${escapeHtml(song.genre)}</span>`
                                : ""
                            }
                        </div>
                    </div>
                    <div class="song-card-arrow">→</div>
                </div>
            `;
    })
    .join("");

  console.log(
    `✅ 已渲染 ${sortedSongs.length} 首歌曲，排序: ${sortBy} ${sortOrder}`
  );
}

// 渲染詩詞列表
function renderPoems() {
  const poemGrid = document.getElementById("poemGrid");
  const visiblePoems = filteredRows("poems");
  resultSummary("poems",visiblePoems.length);
  if (!visiblePoems.length) {poemGrid.innerHTML = emptyResults("poems"); return;}
  poemGrid.innerHTML = visiblePoems
    .map(
      (poem) => `
        <div class="song-card" data-detail="${escapeHtml(poem.id)}" data-type="poem" role="button" tabindex="0">
          ${coverImage(poem.image || "images/gray.jpg",poem.title)}
          <div class="song-card-content">
            <h3>${escapeHtml(poem.title)}</h3>
            <p>${escapeHtml(poem.creators ? poem.creators.join(", ") : poem.artist)}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function renderClassical() {
  const classicalGrid = document.getElementById("classicalGrid");
  if (!classicalGrid) {
    console.error("❌ classicalGrid 元素不存在！");
    return;
  }

  const sortByElement = document.getElementById("classicalSort");
  const sortOrderElement = document.getElementById("classicalOrder");
  const sortBy = sortByElement ? sortByElement.value : "dateAdded";
  const sortOrder = sortOrderElement ? sortOrderElement.value : "desc"; // desc=遞減, asc=遞增

  let sortedClassicals = filteredRows("classical");
  resultSummary("classical",sortedClassicals.length);
  if (!sortedClassicals.length) {classicalGrid.innerHTML = emptyResults("classical"); return;}

  switch (sortBy) {
    case "dateAdded":
      // 按加入日期排序（ID中的時間戳）
      sortedClassicals.sort((a, b) => {
        const timeA = parseInt(a.id.replace(/^(classical|cls)/, "")) || 0;
        const timeB = parseInt(b.id.replace(/^(classical|cls)/, "")) || 0;
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
      console.log(
        `✅ 按加入日期${sortOrder === "desc" ? "遞減" : "遞增"}排序完成`
      );
      break;
    case "releaseDate":
      // 按發行日期排序 - 統一使用 release_date 欄位
      sortedClassicals.sort((a, b) => {
        // 🔴 只使用 release_date 欄位，格式為 YYYY-MM-DD
        const dateA = new Date(a.releasedate || a.release_date || "1000-01-01");
        const dateB = new Date(b.releasedate || b.release_date || "1000-01-01");

        // 檢查日期是否有效
        if (isNaN(dateA.getTime())) {
          console.warn(
            `無效的發行日期 A: ${a.releasedate || a.release_date} (歌曲: ${a.title})`
          );
          dateA.setFullYear(1000, 0, 1);
        }
        if (isNaN(dateB.getTime())) {
          console.warn(
            `無效的發行日期 B: ${b.releasedate || b.release_date} (歌曲: ${b.title})`
          );
          dateB.setFullYear(1000, 0, 1);
        }

        // 根據排序方向返回結果
        return sortOrder === "desc"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });

      console.log(
        `✅ 按發行日期${sortOrder === "desc" ? "遞減" : "遞增"}排序完成`
      );
      break;

    case "alphabet":
      // 按字母排序
      sortedClassicals.sort((a, b) => {
        const result = a.title.localeCompare(b.title, "zh-TW");
        return sortOrder === "desc" ? -result : result;
      });
      console.log(`✅ 按字母${sortOrder === "desc" ? "遞減" : "遞增"}排序完成`);
      break;

    default:
      console.log("✅ 使用預設排序");
  }

  classicalGrid.innerHTML = sortedClassicals
    .map((classical) => {
      const composer =
        classical.composer && classical.composer.length > 0
          ? classical.composer.join(", ")
          : "";
      const albums = classical.albums || "";

      return `
                <div class="song-card" data-detail="${escapeHtml(classical.id)}" data-type="classical" role="button" tabindex="0">
                    ${coverImage(classical.image || "images/gray.jpg",classical.title)}
                    <div class="song-card-content">
                        <div class="song-info classical-song-info">
                            <h3>${escapeHtml(classical.title)}</h3>
                            <p class="composer">${escapeHtml(composer)}</p>
                            ${
                              albums
                                ? `<p class="album mobile-show">${escapeHtml(albums)}</p>`
                                : ""
                            }
                        </div>
                        
                        <div class="song-meta desktop-only">
                            ${
                              albums
                                ? `<div class="meta-item"><span class="meta-label">專輯：</span>${escapeHtml(albums)}</div>`
                                : ""
                            }
                        </div>
                    </div>
                    <div class="song-card-arrow">→</div>
                </div>
            `;
    })
    .join("");

  console.log(
    `✅ 已渲染 ${sortedClassicals.length} 首歌曲，排序: ${sortBy} ${sortOrder}`
  );
}

// 顯示歌曲/詩詞詳情
function showSongDetail(id, type, updateHistory = true) {
  const data = type === "song" ? songs : poems;
  const item = data.find((s) => s.id === id);
  if (!item) return;

  const songDetail = document.getElementById("songDetail");
  songDetail.innerHTML = `
    <div class="song-detail">
      <a href="#${
        type === "song" ? "songs" : "poems"
      }" class="back-btn" data-navigate="${type === "song" ? "songs" : "poems"}">← 返回</a>
      <div class="song-detail-header">
        ${item.image ? `<img src="${safeImage(item.image)}" alt="${escapeHtml(item.title)}">` : ""}
        <h1>${escapeHtml(item.title)}</h1>
        <p class="artist">${escapeHtml(item.creators ? item.creators.join(", ") : "")}</p>
      </div>
      <a href="#" class="favorite-link" data-favorite-source="${escapeHtml(item.id)}">
  收藏歌詞
</a>
      ${detailTools(type,item)}
      ${generateSongMeta(item)} 
      <div class="lyrics">${escapeHtml(item.lyrics)}</div>

       <!-- 🔴 新增刪除按鈕 (只在歌曲頁面顯示) -->
      ${type === "song" ? `<button class="delete-song-btn" data-delete-song="${escapeHtml(item.id)}">刪除歌曲</button>` : ""}
    </div>
  `;
  // 切換到詳情頁面
  showPage("songDetail", false);
  document.title = `${item.title}｜Verse`;
  setCurrentNavigation(type === 'song' ? 'songs' : 'poems');
  if (updateHistory) updateHash(`${type}/${encodeURIComponent(id)}`);

  // 顯示前後導航按鈕
  updateNavigationButtons(id, type);
}

function showClassicalDetail(id, updateHistory = true) {
  const item = classical.find((c) => c.id === id);
  if (!item) {
    console.error("找不到古典音樂 ID:", id);
    return showPage("classical");
  }

  const songDetail = document.getElementById("songDetail");
  songDetail.innerHTML = `
    <a href="#classical" class="back-btn" data-navigate="classical">← 返回古典音樂</a>
    <div class="song-detail-header">
      ${item.image ? `<img src="${safeImage(item.image)}" alt="${escapeHtml(item.title)}">` : ""}
      <h1>${escapeHtml(item.title)}</h1>
      <p class="artist">${escapeHtml(Array.isArray(item.composer) ? item.composer.join(", ") : item.composer || "未知作曲家")}</p>
      ${item.othername ? `<p>${escapeHtml(item.othername)}</p>` : ""}
    </div>
    ${detailTools('classical',item)}
    <div class="song-detail-meta">
      ${item.albums ? `<div class="meta-row"><span class="meta-label">專輯:</span> <span>${escapeHtml(item.albums)}</span></div>` : ""}
      ${(item.releasedate || item.release_date) ? `<div class="meta-row"><span class="meta-label">發行:</span> <span>${escapeHtml(item.releasedate || item.release_date)}</span></div>` : ""}
      ${item.notes ? `<div class="meta-row"><span class="meta-label">註記:</span> <span>${escapeHtml(item.notes)}</span></div>` : ""}
    </div>
  `;
  showPage("songDetail", false);
  document.title = `${item.title}｜Verse`;
  setCurrentNavigation('classical');
  if (updateHistory) updateHash(`classical/${encodeURIComponent(id)}`);
  updateNavigationButtons(id, "classical");
  console.log("顯示古典詳情:", item.title); // 除錯用
}

// 更新導航按鈕
function updateNavigationButtons(currentId, type) {
  const data = type === "song" ? songs : type === "classical" ? classical : poems;
  const navigate = id => type === "classical" ? showClassicalDetail(id) : showSongDetail(id, type);
  const currentIndex = data.findIndex((s) => s.id === currentId);
  const prevBtn = document.getElementById("prevPostBtn");
  const nextBtn = document.getElementById("nextPostBtn");

  if (currentIndex > 0) {
    prevBtn.style.display = "flex";
    prevBtn.onclick = () => navigate(data[currentIndex - 1].id);
  } else {
    prevBtn.style.display = "none";
  }

  if (currentIndex < data.length - 1) {
    nextBtn.style.display = "flex";
    nextBtn.onclick = () => navigate(data[currentIndex + 1].id);
  } else {
    nextBtn.style.display = "none";
  }
}

// 返回列表頁面
function goBack(page) {
  showPage(page);
  document.getElementById("prevPostBtn").style.display = "none";
  document.getElementById("nextPostBtn").style.display = "none";
}

function setCurrentNavigation(pageId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const selected = link.dataset.page === pageId;
    link.classList.toggle('active',selected);
    if (selected) link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
  });
}
// 顯示指定頁面
function showPage(pageId, updateHistory = true) {
  const target = document.getElementById(pageId);
  if (!target?.classList.contains("page")) return;
  if (updateHistory && pageId !== "songDetail") updateHash(pageId);
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  target.classList.add("active");

  const pageTitles = {home:'Verse｜歌曲與文字收藏',songs:'歌曲｜Verse',poems:'文章｜Verse',classical:'古典音樂｜Verse',favorites:'剪影｜Verse',upload:'新增收藏｜Verse',artists:'創作者｜Verse',artistDetail:'創作者｜Verse'};
  if (pageTitles[pageId]) document.title = pageTitles[pageId];
  setCurrentNavigation(pageId);

  // 隱藏箭頭按鈕（如果不是詳情頁面）- 加入檢查避免錯誤
  if (pageId !== "songDetail") {
    const prevBtn = document.getElementById("prevPostBtn");
    const nextBtn = document.getElementById("nextPostBtn");
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
  }

  // 關閉選單和遮罩
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");
  const wasMenuOpen = nav?.classList.contains("active");
  setMenuOpen(false);
  applyMutationAvailability();
  if (wasMenuOpen && window.innerWidth <= 768) {const heading = target.querySelector("h1,h2"); heading?.setAttribute("tabindex","-1"); heading?.focus();}
}

// 導航連結點擊事件
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    showPage(page);

    // 關閉手機版選單
    if (window.innerWidth <= 768) {
      document.getElementById("nav").classList.remove("active");
    }
  });
});

// 手機版選單切換
document.getElementById("menuBtn").addEventListener("click", () => {
  toggleMenu();
});

// 初始化
renderSongs();
renderPoems();
renderClassical();

function toggleMenu() {
    setMenuOpen(!document.getElementById('nav').classList.contains('active'));
  }

function bindImagePreview(inputId, previewId) {
  const input = document.getElementById(inputId), preview = document.getElementById(previewId);
  if (!input || !preview) return;
  const clear = () => {
    input.setCustomValidity('');
    if (preview.dataset.objectUrl) {URL.revokeObjectURL(preview.dataset.objectUrl);delete preview.dataset.objectUrl;}
    preview.replaceChildren();preview.removeAttribute('role');
  };
  const fail = message => {input.setCustomValidity(message);preview.textContent = message;preview.setAttribute('role','alert');};
  input.addEventListener('change', () => {
    clear();
    const file = input.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return fail('圖片上限為 10MB，請選擇較小的檔案。');
    if (!['image/jpeg','image/png','image/gif','image/webp'].includes(file.type)) return fail('請選擇 JPEG、PNG、GIF 或 WebP 圖片。');
    const url = URL.createObjectURL(file);preview.dataset.objectUrl = url;
    const img = document.createElement('img');img.dataset.uploadPreview = 'true';img.alt = '封面預覽';img.src = url;
    img.addEventListener('error', () => {
      if (preview.dataset.objectUrl !== url) return;
      clear();fail('無法讀取這張圖片，請重新選擇有效的圖片。');
    });
    preview.appendChild(img);
  });
  input.form?.addEventListener('reset',clear);
}

bindImagePreview('songImage','imagePreview');

// 處理表單提交
bindUploadForm('uploadForm','/api/upload-song','songs','song','uploadStatus','imagePreview');

// ===== 首頁功能 =====

// 渲染首頁統計資訊
function renderHomeStats() {
  const statSongs = document.getElementById("statSongs");
  const statArtists = document.getElementById("statArtists");
  const statClassicals = document.getElementById("statClassicals");

  if (statSongs) statSongs.textContent = songs.filter((s) => s && s.id).length;
  if (statClassicals)
    statClassicals.textContent = classical.filter((p) => p && p.id).length;

  const artists = getArtists();
  if (statArtists) statArtists.textContent = artists.length;
}

// 渲染首頁熱門歌手（前6位）
function renderHomeArtists() {
  const homeArtistGrid = document.getElementById("homeArtistGrid");
  if (!homeArtistGrid) return;

  let artists = getArtists();
  artists.sort((a, b) => b.count - a.count);
  const topArtists = artists.slice(0, 6);

  homeArtistGrid.innerHTML = topArtists
    .map((artist) => {
      const initial = artist.name.charAt(0);
      return `
      <div class="artist-card" data-artist="${escapeHtml(artist.name)}" role="button" tabindex="0">
        <div class="artist-card-avatar">${escapeHtml(initial)}</div>
        <div class="artist-card-name">${escapeHtml(artist.name)}</div>
        <div class="artist-card-count">${escapeHtml(artist.count)} 首</div>
      </div>
    `;
    })
    .join("");
}

// 渲染首頁最新歌曲（前4首）
function renderHomeSongs() {
  const homeSongGrid = document.getElementById("homeSongGrid");
  if (!homeSongGrid) return;

  const validSongs = songs.filter((s) => s && s.id);
  const latestSongs = validSongs.slice(-4).reverse();

  homeSongGrid.innerHTML = latestSongs
    .map((song) => {
      const creators = song.creators ? song.creators.join(", ") : "";
      const albums = song.albums || "";

      return `
      <div class="song-card" data-detail="${escapeHtml(song.id)}" data-type="song" role="button" tabindex="0">
        ${coverImage(song.image,song.title)}
        <div class="song-card-content">
          <div class="song-info">
            <h3>${escapeHtml(song.title)}</h3>
            <p class="creator">${escapeHtml(creators)}</p>
            ${albums ? `<p class="album mobile-show">${escapeHtml(albums)}</p>` : ""}
          </div>
          <div class="song-card-arrow">→</div>
        </div>
      </div>
    `;
    })
    .join("");
}

// 渲染首頁最新詩詞（前4首）
function renderHomePoems() {
  const homePoemGrid = document.getElementById("homePoemGrid");
  if (!homePoemGrid) return;

  const validPoems = poems.filter((p) => p && p.id);
  const latestPoems = validPoems.slice(-4).reverse();

  homePoemGrid.innerHTML = latestPoems
    .map((poem) => {
      const creators = poem.creators ? poem.creators.join(", ") : "";

      return `
      <div class="song-card" data-detail="${escapeHtml(poem.id)}" data-type="poem" role="button" tabindex="0">
        ${coverImage(poem.image || "images/gray.jpg",poem.title)}
        <div class="song-card-content">
          <div class="song-info">
            <h3>${escapeHtml(poem.title)}</h3>
            <p class="creator">${escapeHtml(creators)}</p>
          </div>
          <div class="song-card-arrow">→</div>
        </div>
      </div>
    `;
    })
    .join("");
}
classical;

function renderHomeClassical() {
  const homeClassicalGrid = document.getElementById("homeClassicalGrid");
  if (!homeClassicalGrid) return;

  const validClassicals = classical.filter((s) => s && s.id);
  const latestClassicals = validClassicals.slice(-4).reverse();

  homeClassicalGrid.innerHTML = latestClassicals
    .map((classical) => {
      const composer = classical.composer ? classical.composer.join(", ") : "";
      const albums = classical.albums || "";

      return `
      <div class="song-card" data-detail="${escapeHtml(classical.id)}" data-type="classical" role="button" tabindex="0">
        ${coverImage(classical.image || "images/gray.jpg",classical.title)}
        <div class="song-card-content">
          <div class="song-info classical-song-info">
            <h3>${escapeHtml(classical.title)}</h3>
            <p class="creator">${escapeHtml(composer)}</p>
          </div>
          <div class="classical-card-arrow">→</div>
        </div>
      </div>
    `;
    })
    .join("");
}

// 渲染整個首頁
function renderHomePage() {
  renderHomeStats();
  renderHomeRecentFavorites(); // 🔴 新增這行
  renderHomeArtists();
  renderHomeSongs();
  renderHomePoems();
  renderHomeClassical();
}

document.addEventListener("DOMContentLoaded", function () {
  // 渲染首頁
  renderHomePage();

  // 渲染歌手清單
  renderHomeArtists();

  // 渲染歌曲列表
  renderHomeSongs();

  // 渲染詩詞列表
  renderHomePoems();

  // 渲染收藏句子列表
  renderFavorites();

  renderHomeRecentFavorites(); // 🔴 新增這行

  renderClassical();

  document.getElementById("classicalSort")?.addEventListener("change", renderClassical);
  document.getElementById("classicalOrder")?.addEventListener("change", renderClassical);
  const songSortSelect = document.getElementById("songSort");
  const sortOrderSelect = document.getElementById("sortOrder");

  if (songSortSelect) {
    songSortSelect.addEventListener("change", function () {
      console.log("🔄 排序方式變更為:", this.value);
      renderSongs();
    });
  }

  // 🔴 新增：排序順序監聽器
  if (sortOrderSelect) {
    sortOrderSelect.addEventListener("change", function () {
      console.log("🔄 排序順序變更為:", this.value);
      renderSongs();
    });
  }
  // 初始渲染歌曲
  renderSongs();
});

// ===== 歌手清單功能 =====

// 提取所有歌手及其歌曲數量
function getArtists() {
  const artistMap = new Map();

  songs.forEach((song) => {
    if (!song || !song.creators) return;

    song.creators.forEach((creator) => {
      const name = creator.trim();
      if (name) {
        if (!artistMap.has(name)) {
          artistMap.set(name, {
            name: name,
            count: 0,
            songs: []
          });
        }
        const artist = artistMap.get(name);
        artist.count++;
        artist.songs.push(song);
      }
    });
  });

  return Array.from(artistMap.values());
}

// 渲染歌手清單
function renderArtists() {
  const artistGrid = document.getElementById("artistGrid");
  if (!artistGrid) return;

  let artists = getArtists();

  // 取得排序方式
  const sortBy = document.getElementById("artistSort")?.value || "count";

  if (sortBy === "count") {
    artists.sort((a, b) => b.count - a.count);
  } else {
    artists.sort((a, b) => a.name.localeCompare(b.name, "zh-TW"));
  }

  artistGrid.innerHTML = artists
    .map((artist) => {
      // 取得歌手名字的第一個字作為頭像
      const initial = artist.name.charAt(0);

      return `
      <div class="artist-card" data-artist="${escapeHtml(artist.name)}" role="button" tabindex="0">
        <div class="artist-card-avatar">${escapeHtml(initial)}</div>
        <div class="artist-card-name">${escapeHtml(artist.name)}</div>
        <div class="artist-card-count">${escapeHtml(artist.count)} 首歌曲</div>
      </div>
    `;
    })
    .join("");
}

// 顯示單一歌手的詳細資訊
function showArtistDetail(artistName, updateHistory = true) {
  const artists = getArtists();
  const artist = artists.find((a) => a.name === artistName);

  if (!artist) return;

  // 更新標題
  document.getElementById("artistName").textContent = artist.name;
  document.getElementById("artistSongCount").textContent =
    `共 ${artist.count} 首歌曲`;

  // 渲染該歌手的所有歌曲
  const artistSongGrid = document.getElementById("artistSongGrid");
  artistSongGrid.innerHTML = artist.songs
    .filter((song) => song && song.id)
    .map((song) => {
      const creators = song.creators ? song.creators.join(", ") : "";
      const lyricist = song.lyricist ? song.lyricist.join(", ") : "";
      const composer =
        song.composer && song.composer.length > 0
          ? song.composer.join(", ")
          : "";
      const albums = song.albums || "";

      return `
        <div class="song-card" data-detail="${escapeHtml(song.id)}" data-type="song" role="button" tabindex="0">
          ${coverImage(song.image || "images/gray.jpg",song.title)}
          <div class="song-card-content">
            <div class="song-info">
              <h3>${escapeHtml(song.title)}</h3>
              <p class="creator">${escapeHtml(creators)}</p>
              ${albums ? `<p class="album mobile-show">${escapeHtml(albums)}</p>` : ""}
            </div>
            <div class="song-meta desktop-only">
              ${
                lyricist
                  ? `<div class="meta-item"><span class="meta-label">作詞:</span> ${escapeHtml(lyricist)}</div>`
                  : ""
              }
              ${
                composer
                  ? `<div class="meta-item"><span class="meta-label">作曲:</span> ${escapeHtml(composer)}</div>`
                  : ""
              }
              ${
                albums
                  ? `<div class="meta-item"><span class="meta-label">專輯:</span> ${escapeHtml(albums)}</div>`
                  : ""
              }
            </div>
            <div class="song-card-arrow">→</div>
          </div>
        </div>
      `;
    })
    .join("");

  showPage("artistDetail", false);
  document.title = `${artistName}｜Verse`;
  setCurrentNavigation('artists');
  if (updateHistory) updateHash(`artist/${encodeURIComponent(artistName)}`);
}

// 監聽排序變更
document
  .getElementById("artistSort")
  ?.addEventListener("change", renderArtists);

// 在頁面載入時渲染歌手清單
document.addEventListener("DOMContentLoaded", function () {
  // ... 其他初始化程式碼

  // 渲染歌手清單
  renderArtists();
});

// ===== 收藏歌詞功能 =====

// 儲存收藏的歌詞（使用變數，不用 localStorage）
let favoriteLyrics = [];

// 打開收藏表單
function openFavoriteModal(songId,songTitle,songCreators) {
    if (appMode !== 'server') return;
    favoriteFocusReturn = document.activeElement;
    document.getElementById('favoriteSongId').value = songId;
    document.getElementById('favoriteSongTitle').value = songTitle;
    document.getElementById('favoriteSongCreators').value = songCreators;
    document.getElementById('favoriteLyrics').value = '';
    document.getElementById('favoriteNote').value = '';
    document.getElementById('favoriteStatus').textContent = '';
    const modal = document.getElementById('favoriteModal');
    modal.classList.add('active'); modal.setAttribute('aria-hidden','false');
    setBackgroundInert(true);
    document.getElementById('favoriteLyrics').focus();
  }

// 關閉收藏表單
function closeFavoriteModal(force = false) {
    const modal = document.getElementById('favoriteModal');
    if (!modal.classList.contains('active') || (favoriteSaving && !force)) return;
    modal.classList.remove('active'); modal.setAttribute('aria-hidden','true');
    setBackgroundInert(false);
    if (favoriteFocusReturn?.isConnected) favoriteFocusReturn.focus();
  }

// 儲存收藏
async function saveFavorite() {
    if (favoriteSaving || appMode !== 'server') return;
    const modal = document.getElementById('favoriteModal');
    const status = document.getElementById('favoriteStatus');
    const lyrics = document.getElementById('favoriteLyrics').value;
    if (!lyrics.trim()) {setUploadStatus(status,'請輸入收藏片段。',true); document.getElementById('favoriteLyrics').focus(); return;}
    const payload = {lyrics,note:document.getElementById('favoriteNote').value,songId:document.getElementById('favoriteSongId').value,songTitle:document.getElementById('favoriteSongTitle').value,songCreators:document.getElementById('favoriteSongCreators').value};
    const controls = [...modal.querySelectorAll('button,textarea')].map(element => [element,element.disabled]);
    favoriteSaving = true; modal.setAttribute('aria-busy','true');
    controls.forEach(([element]) => {element.disabled = true;});
    setUploadStatus(status,'正在儲存收藏…');
    try {
      const result = await responseJson(await apiFetch('/api/add-favorite',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}));
      if (!result.favorite?.id) throw new Error('伺服器未回傳收藏，請重新整理確認。');
      replaceRecord('favorites',result.favorite);
      closeFavoriteModal(true);
      showStatus(result.message || '收藏成功！','success');
    } catch (error) {setUploadStatus(status,'儲存失敗：' + error.message + ' 輸入已保留。',true);}
    finally {favoriteSaving = false; modal.removeAttribute('aria-busy'); controls.forEach(([element,disabled]) => {element.disabled = disabled;}); applyMutationAvailability();}
  }

// 刪除收藏
async function deleteFavorite(id) {
  if (!confirm("確定要刪除這個收藏嗎？")) return;

  try {
    const response = await apiFetch("/api/delete-favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id })
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ " + result.message);
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    } else {
      alert("❌ " + result.error);
    }
  } catch (error) {
    console.error("刪除失敗:", error);
    alert("❌ 刪除失敗");
  }
}

// 渲染收藏列表
function renderFavorites() {
  const favoriteGrid = document.getElementById("favoriteGrid");
  const emptyState = document.getElementById("emptyFavorites");

  if (!favoriteGrid) return;

  // 從 main.js 的 favorites 陣列讀取
  const visibleFavorites = filteredRows("favorites");
  resultSummary("favorites",visibleFavorites.length);
  if (!visibleFavorites.length && favorites.length) {favoriteGrid.style.display = "grid"; if (emptyState) emptyState.style.display = "none"; favoriteGrid.innerHTML = emptyResults("favorites"); return;}
  if (favorites.length === 0) {
    favoriteGrid.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  favoriteGrid.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  favoriteGrid.innerHTML = visibleFavorites
    .slice()
    .reverse()
    .map(
      (fav) => `
      <div class="favorite-card">
        <button class="favorite-delete" data-delete-favorite="${escapeHtml(fav.id)}" aria-label="刪除收藏">×</button>
        <div class="favorite-lyrics">${escapeHtml(fav.lyrics)}</div>
        ${fav.note ? `<div class="favorite-note">${escapeHtml(fav.note)}</div>` : ""}
        <div class="favorite-source">
          <strong>${escapeHtml(fav.songTitle)}</strong> - ${escapeHtml(fav.songCreators)}
        </div>
      </div>
    `
    )
    .join("");
}

// 修改 showSongDetail 函式，加入收藏按鈕
// 在 songDetail.innerHTML 中的 .song-detail-header 後面加入按鈕

// 生成歌曲詳細資訊區塊
function generateSongMeta(item) {
  const fields = [["作詞", "lyricist"], ["作曲", "composer"], ["原唱", "original_artist"], ["專輯", "albums"], ["發行日期", "release_date"], ["語言", "language"], ["風格", "genre"], ["類型", "poem_type"], ["翻譯", "translation"]];
  const values = fields.filter(([,field]) => item[field]?.length).map(([label,field]) => ({label, value: Array.isArray(item[field]) ? item[field].join(", ") : item[field]}));
  return values.length ? `<div class="song-detail-meta">${values.map(meta => `<div class="meta-row"><span class="meta-label">${escapeHtml(meta.label)}：</span><span class="meta-value">${escapeHtml(meta.value)}</span></div>`).join("")}</div>` : "";
}

// 全域變數
let panelVisible = false;

// 切換面板顯示/隱藏
function togglePanel() {
  if (importBusy) return;
  const panel = document.getElementById('import-export-panel');
  const toggleBtn = document.getElementById('toggle-panel-btn');
  panelVisible = !panelVisible;
  panel.hidden = !panelVisible;
  toggleBtn.hidden = panelVisible;
  toggleBtn.setAttribute('aria-expanded',String(panelVisible));
  (panelVisible ? panel.querySelector('button') : toggleBtn)?.focus();
}

// 顯示狀態訊息
let statusHideTimer;
function showStatus(message, type = "info") {
  clearTimeout(statusHideTimer);
  const statusDiv = document.getElementById("operation-status");
  statusDiv.hidden = false;
  statusDiv.textContent = message;

  statusDiv.setAttribute("role", type === "error" ? "alert" : "status");
  // 設定顏色
  switch (type) {
    case "success":
      statusDiv.style.background = "#d4edda";
      statusDiv.style.color = "#155724";
      statusDiv.style.border = "1px solid #c3e6cb";
      break;
    case "error":
      statusDiv.style.background = "#f8d7da";
      statusDiv.style.color = "#721c24";
      statusDiv.style.border = "1px solid #f5c6cb";
      break;
    case "warning":
      statusDiv.style.background = "#fff3cd";
      statusDiv.style.color = "#856404";
      statusDiv.style.border = "1px solid #ffeaa7";
      break;
    default:
      statusDiv.style.background = "#d1ecf1";
      statusDiv.style.color = "#0c5460";
      statusDiv.style.border = "1px solid #bee5eb";
  }

  // 自動隱藏
  if (type === 'success') statusHideTimer = setTimeout(() => { statusDiv.hidden = true; }, 5000);
}

// 查看本地資料
async function viewLocalData() {
    showStatus('收藏資料：' + songs.length + ' 首歌曲、' + poems.length + ' 篇文章、' + classical.length + ' 首古典音樂、' + favorites.length + ' 個收藏。','info');
  }

// 匯出本地資料
function exportLocalData() {
    if (appMode === 'loading') return showStatus('資料尚未載入，請稍候。','warning');
    downloadCollection({exportTime:new Date().toISOString(),source:'Song Collection System',version:'3.0',songs,poems,classical,favorites}, 'verse-export-' + new Date().toISOString().slice(0,10) + '.json');
    showStatus('匯出檔案已準備完成。','success');
  }

let pendingImport = null;
let importBusy = false;
let importGeneration = 0;
let importFocusReturn = null;
const collectionLabels = {songs:'歌曲',poems:'文章',classical:'古典音樂',favorites:'收藏'};
function importPeople(value) {
  const items = Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [];
  if (items.some(item => typeof item !== 'string')) throw new Error('創作者格式錯誤。');
  return items.map(value => value.trim()).filter(Boolean);
}
function previewKey(row,kind) {
  if (kind === 'favorites') return `${row.songId || row.songTitle}\u0000${row.lyrics}`;
  return `${row.title.trim()}\u0000${importPeople(kind === 'classical' ? row.composer : row.creators).join(',')}`.toLocaleLowerCase();
}
function prepareImport(data) {
  const incoming = Array.isArray(data) ? {songs:data} : data;
  if (!incoming || typeof incoming !== 'object') throw new Error('JSON 應包含收藏資料。');
  const summary = {};
  const providedIds = [];
  for (const kind of Object.keys(collectionLabels)) {
    const rows = incoming[kind] ?? [];
    if (!Array.isArray(rows)) throw new Error(`${collectionLabels[kind]}資料必須是陣列。`);
    if (rows.length > 5000) throw new Error('每種類別單次最多匯入 5000 項。');
    const keys = new Set(rowsFor(kind).map(row => previewKey(row,kind)));
    let duplicates = 0;
    for (const row of rows) {
      if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error('匯入項目格式錯誤。');
      if (row.id) {if (typeof row.id !== 'string' || !/^[A-Za-z0-9_-]{1,120}$/.test(row.id)) throw new Error('匯入 ID 格式錯誤。'); providedIds.push(row.id);}
      if (kind === 'favorites') {
        if (typeof row.lyrics !== 'string' || !row.lyrics.trim() || typeof row.songTitle !== 'string' || !row.songTitle.trim()) throw new Error('收藏需要片段與來源名稱。');
      } else {
        if (typeof row.title !== 'string' || !row.title.trim() || !importPeople(kind === 'classical' ? row.composer : row.creators).length) throw new Error(`${collectionLabels[kind]}需要名稱與創作者。`);
        if (kind !== 'classical' && (typeof row.lyrics !== 'string' || !row.lyrics.trim())) throw new Error(`${collectionLabels[kind]}需要內容。`);
      }
      const key = previewKey(row,kind);
      if (keys.has(key)) duplicates++; else keys.add(key);
    }
    summary[kind] = {total:rows.length,new:rows.length-duplicates,duplicates,examples:rows.slice(0,3).map(row => row.title || row.songTitle)};
  }
  if (new Set(providedIds).size !== providedIds.length) throw new Error('匯入檔案包含重複 ID，請先修正。');
  if (!Object.values(summary).some(row => row.total)) throw new Error('檔案中沒有可匯入的收藏。');
  const sourceIds = new Set([...songs,...poems,...(incoming.songs || []),...(incoming.poems || [])].map(row => row.id).filter(Boolean));
  if ((incoming.favorites || []).some(row => !sourceIds.has(row.songId))) throw new Error('收藏來源不存在，請一併匯入來源歌曲或文章。');
  return {data:incoming,summary};
}
function showImportDialog() {
  const dialog = document.getElementById('importDialog');
  if (!dialog.open) {
    importFocusReturn = document.activeElement;
    dialog.showModal();
  }
}
function renderImportPreview(error = '') {
  const preview = document.getElementById('importPreview');
  preview.removeAttribute('role');
  const rows = Object.entries(pendingImport.summary).filter(([,row]) => row.total);
  preview.innerHTML = `<p class="import-filename">${escapeHtml(pendingImport.filename)}</p>${error ? `<p role="alert" class="import-error">${escapeHtml(error)} 檔案已保留。</p>` : ''}<ul>${rows.map(([kind,row]) => `<li>${collectionLabels[kind]}：${row.total} 項，預估新增 ${row.new} 項、跳過 ${row.duplicates} 項重複</li>`).join('')}</ul><details><summary>查看部分內容</summary>${rows.map(([kind,row]) => `<p>${collectionLabels[kind]}：${row.examples.map(escapeHtml).join('、')}</p>`).join('')}</details><p class="import-help">匯入會保留現有收藏，重複內容將跳過。實際數量會在完成後顯示。圖片檔案需另外放入 images；JSON 不包含圖片。</p><div class="import-actions"><button type="button" class="btn btn--primary" data-action="import-confirm">${pendingImport.result ? '重新讀取清單' : '確認匯入'}</button><button type="button" class="btn btn--secondary" data-action="import-cancel">取消</button></div>`;
  showImportDialog();
  preview.querySelector('[data-action=import-confirm]')?.focus();
}
function closeImportDialog() {
  if (importBusy) return;
  ++importGeneration;
  pendingImport = null;
  document.getElementById('importFileInput').value = '';
  document.getElementById('importDialog').close();
  if (importFocusReturn?.isConnected && importFocusReturn.getClientRects().length) importFocusReturn.focus();
}
function cancelImport() { closeImportDialog(); }
async function handleImportFile() {
  if (appMode !== 'server' || importBusy) return;
  const fileInput = document.getElementById('importFileInput');
  const file = fileInput.files[0];
  if (!file) return;
  const generation = ++importGeneration;
  pendingImport = null;
  try {
    if (!file.name.toLowerCase().endsWith('.json')) throw new Error('請選擇 JSON 檔案。');
    if (file.size > 10 * 1024 * 1024) throw new Error('JSON 檔案必須小於 10MB。');
    const prepared = prepareImport(JSON.parse(await file.text()));
    if (generation !== importGeneration) return;
    pendingImport = {...prepared,filename:file.name};
    renderImportPreview();
  } catch (error) {
    if (generation !== importGeneration) return;
    fileInput.value = '';
    showStatus(error instanceof SyntaxError ? '檔案不是有效的 JSON。請重新選擇。' : error.message,'error');
  }
}
async function executeImport() {
  if (!pendingImport || importBusy || appMode !== 'server') return;
  const dialog = document.getElementById('importDialog');
  const panel = document.getElementById('import-export-panel');
  const controls = [...dialog.querySelectorAll('button'), ...panel.querySelectorAll('button,input')].map(element => [element,element.disabled]);
  importBusy = true; dialog.setAttribute('aria-busy','true'); panel.setAttribute('aria-busy','true');
  controls.forEach(([element]) => {element.disabled = true;});
  showStatus('正在匯入資料，請稍候…','info');
  try {
    if (!pendingImport.result) pendingImport.result = await responseJson(await apiFetch('/api/import/songs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(pendingImport.data)}));
    const updated = await responseJson(await apiFetch('/api/songs'));
    if (!['songs','poems','classical','favorites'].every(kind => Array.isArray(updated[kind]))) throw new Error('匯入已完成，但更新畫面失敗。可以重新讀取清單。');
    songs = updated.songs; poems = updated.poems; classical = updated.classical; favorites = updated.favorites;
    initializeSearch();
    renderSongs();renderPoems();renderClassical();renderFavorites();renderHomePage();renderArtists();
    const imported = pendingImport.result.imported;
    const preview = document.getElementById('importPreview');
    preview.innerHTML = `<p role="status">匯入完成</p><ul>${Object.keys(collectionLabels).map(kind => `<li>${collectionLabels[kind]}：新增 ${Number(imported[kind]) || 0} 項</li>`).join('')}</ul><p>已跳過 ${['songDuplicates','poemDuplicates','classicalDuplicates','favoriteDuplicates'].reduce((total,key) => total + (Number(imported[key]) || 0),0)} 項重複內容。</p><div class="import-actions"><button type="button" class="btn btn--primary" data-action="import-close">完成</button></div>`;
    pendingImport = null; document.getElementById('importFileInput').value = '';
    showStatus('匯入完成，收藏清單已更新。','success');
    preview.querySelector('button').focus();
  } catch (error) {
    const prefix = pendingImport.result ? '資料已匯入，畫面更新失敗：' : '匯入失敗：';
    renderImportPreview(prefix + error.message); showStatus(prefix + error.message,'error');
  } finally {
    importBusy = false;dialog.removeAttribute('aria-busy');panel.removeAttribute('aria-busy');
    controls.forEach(([element,disabled]) => {if(element.isConnected)element.disabled = disabled;});
    applyMutationAvailability();
  }
}
document.getElementById('importFileInput').addEventListener('change', handleImportFile);
document.getElementById('importDialog').addEventListener('cancel', event => {
  event.preventDefault();
  if (!importBusy) closeImportDialog();
});


// Escape closes the optional data panel and returns focus to its toggle.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && panelVisible && !document.getElementById('importDialog').open && !document.getElementById('favoriteModal').classList.contains('active')) togglePanel();
});

// ===== 刪除歌曲函數 =====
async function deleteSong(id, title = songs.find(song => song.id === id)?.title || "") {
  // 雙重確認
  const confirmDelete = confirm(
    `⚠️ 確定要刪除歌曲「${title}」嗎？\n\n此操作將同時刪除：\n• 歌曲本身\n• 所有相關的收藏句子\n\n此操作無法復原！`
  );

  if (!confirmDelete) {
    return;
  }

  // 第二次確認
  const finalConfirm = confirm(`🚨 最後確認：真的要永久刪除「${title}」嗎？`);

  if (!finalConfirm) {
    return;
  }

  try {
    console.log("🗑️ 準備刪除歌曲:", id);

    const response = await apiFetch("/api/delete-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ " + result.message);

      // 返回歌曲列表
      showPage("songs");

      // 重新載入頁面以更新資料
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert("❌ 刪除失敗：" + result.error);
    }
  } catch (error) {
    console.error("❌ 刪除歌曲失敗:", error);
    alert("❌ 刪除失敗：" + error.message);
  }
}

// ===== 渲染首頁最新收藏 =====
function renderHomeRecentFavorites() {
  const homeRecentFavorites = document.getElementById("homeRecentFavorites");
  if (!homeRecentFavorites) return;

  // 獲取最新的 4 個收藏，按時間倒序
  const recentFavorites = [...favorites]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (recentFavorites.length === 0) {
    homeRecentFavorites.innerHTML = `
            <div class="empty-favorites-home">
                <p>還沒有收藏任何句子</p>
                <a href="#songs" data-navigate="songs" class="browse-songs-btn">
                    瀏覽歌曲並收藏句子 →
                </a>
            </div>
        `;
    return;
  }

  homeRecentFavorites.innerHTML = recentFavorites
    .map((fav) => {
      // 截取歌詞，最多顯示 80 字符
      const truncatedLyrics =
        fav.lyrics.length > 80
          ? fav.lyrics.substring(0, 80) + "..."
          : fav.lyrics;

      // 格式化時間為相對時間
      const timeAgo = getTimeAgo(fav.createdAt);

      return `
                <div class="favorite-card-mini" data-favorite-detail="${escapeHtml(fav.id)}" role="button" tabindex="0">
                    <div class="favorite-lyrics-mini">
                        "${escapeHtml(truncatedLyrics)}"
                    </div>
                    <div class="favorite-meta-mini">
                        <div class="favorite-song-info">
                            <strong>${escapeHtml(fav.songTitle)}</strong>
                            ${fav.songCreators ? ` - ${escapeHtml(fav.songCreators)}` : ""}
                        </div>
                        <div class="favorite-time">
                            ${timeAgo}
                        </div>
                    </div>
                    ${
                      fav.note
                        ? `<div class="favorite-note-mini">💭 ${escapeHtml(fav.note)}</div>`
                        : ""
                    }
                </div>
            `;
    })
    .join("");
}

// ===== 時間轉換輔助函數 =====
function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "剛剛";
  if (diffMins < 60) return `${diffMins} 分鐘前`;
  if (diffHours < 24) return `${diffHours} 小時前`;
  if (diffDays < 30) return `${diffDays} 天前`;

  return past.toLocaleDateString("zh-TW", {
    month: "long",
    day: "numeric"
  });
}

// ===== 顯示收藏詳細資訊 =====
function showFavoriteDetail(favoriteId) {
    const favorite = favorites.find(item => item.id === favoriteId);
    if (!favorite) return;
    if (songs.some(item => item.id === favorite.songId)) showSongDetail(favorite.songId,'song');
    else if (poems.some(item => item.id === favorite.songId)) showSongDetail(favorite.songId,'poem');
    else showPage('favorites');
  }

bindImagePreview('poemImage','poemImagePreview');

// ===== 詩詞上傳表單處理 =====
bindUploadForm('uploadPoemForm','/api/upload-poem','poems','poem','uploadPoemStatus','poemImagePreview');

// 古典音樂上傳
// ===== 古典上傳（與歌曲完全相同邏輯） =====
bindUploadForm('uploadClassicalForm','/api/upload-classical','classical','classical','uploadClassicalStatus','classicalImagePreview');

bindImagePreview('classicalImage','classicalImagePreview');

document.addEventListener("keydown", event => {
  if (["Enter", " "].includes(event.key) && event.target.matches("[role=button][tabindex]")) {
    event.preventDefault(); event.target.click();
  }

});

async function loadCollectionData() {
    const status = document.getElementById('dataStatus');
    try {
      let response = await apiFetch('/api/songs');
      let staticPreview = false;
      if (response.status === 404) {
        response = await apiFetch(new URL('data.json',document.baseURI));
        staticPreview = true;
      }
      if (!response.ok) throw new Error('無法讀取收藏資料（' + response.status + '）');
      const data = await response.json();
      if (!['songs','poems','classical','favorites'].every(key => Array.isArray(data[key]))) throw new Error('收藏資料格式錯誤');
      songs = data.songs; poems = data.poems; classical = data.classical; favorites = data.favorites;
      appMode = staticPreview ? 'static' : 'server';
      document.body.dataset.mode = appMode;
      initializeSearch();
      renderSongs(); renderPoems(); renderClassical(); renderHomePage(); renderArtists(); renderFavorites();
      navigateToHash(); applyMutationAvailability();
      status.hidden = !staticPreview;
      if (staticPreview) {status.className = 'mode-notice'; status.textContent = '唯讀預覽：可以瀏覽、搜尋與匯出收藏。新增、刪除和匯入需要使用 Verse server。';}
    } catch (error) {
      status.hidden = false; status.textContent = '讀取失敗：' + error.message + '。請稍後重新整理。'; status.setAttribute('role','alert');
      applyMutationAvailability();
    }
  }
document.addEventListener("DOMContentLoaded", loadCollectionData);
