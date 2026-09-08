(() => {
    const translations = {
        "INICIO": "HOME",
        "COLECCIONES": "COLLECTIONS",
        "ACERCA DE": "ABOUT",
        "ARS / IMVU": "ARS / IMVU",
        "TU": "YOUR",
        "ESTILO.": "STYLE.",
        "A TU": "YOUR",
        "MANERA.": "WAY.",
        "Explora moda digital creada para tu avatar. Descubre nuevas prendas, colecciones y diseños personalizados de ARS.": "Explore digital fashion created for your avatar. Discover new pieces, collections and custom designs from ARS.",
        "EXPLORAR COLECCIÓN": "EXPLORE COLLECTION",
        "MODA DIGITAL": "DIGITAL FASHION",
        "Diseñada para tu identidad en IMVU": "Designed for your IMVU identity",
        "COLECCIONES ARS": "ARS COLLECTIONS",
        "Descubre nuestros últimos productos": "Discover our latest products",
        "DISEÑO PERSONALIZADO": "CUSTOM DESIGN",
        "Creado para tu propio estilo": "Made for your own style",
        "ARS / ACCESORIOS SELECCIONADOS": "ARS / SELECTED ACCESSORIES",
        "Colección destacada": "Featured Collection",
        "ARS SHADOW": "ARS SHADOW",
        "ARS NOIR": "ARS NOIR",
        "ARS CHROME": "ARS CHROME",
        "ARS VOID": "ARS VOID",
        "MODA": "FASHION",
        "ACCESORIOS": "ACCESSORIES",
        "PERSONALIZADO": "CUSTOM",
        "NUEVO": "NEW",
        "VER →": "VIEW →",
        "ARS / COLLECTION 01": "ARS / COLLECTION 01",
        "IDENTIDAD": "IDENTITY",
        "OSCURA": "DARK",
        "Moda digital para tu avatar.": "Digital fashion for your avatar.",
        "VER COLECCIÓN": "VIEW COLLECTION",
        "EXPLORA ARS": "EXPLORE ARS",
        "Categorías": "Categories",
        "ACERCA DE ARS": "ABOUT ARS",
        "IDENTIDAD DIGITAL.": "DIGITAL IDENTITY.",
        "ARS es una propuesta de moda para IMVU centrada en diseños digitales, accesorios y creaciones personalizadas creadas para que cada avatar se sienta único.": "ARS is an IMVU fashion concept focused on digital designs, accessories and custom creations made to make every avatar feel unique.",
        "ARS IMVU": "ARS IMVU",
        "Moda digital / Tu estilo": "Digital fashion / Your style",
        "NAVEGACIÓN": "NAVIGATION",
        "Inicio": "Home",
        "Colecciones exclusivas": "Exclusive collections",
        "Acerca de": "About",
        "EXPLORA": "EXPLORE",
        "Accesorios": "Accessories",
        "Personalizado": "Custom",
        "REDES SOCIALES": "SOCIAL MEDIA",
        "Contacto": "Contact",
        "HECHO PARA CREADORES DIGITALES": "MADE FOR DIGITAL CREATORS",
        "ARS / ACCESORIOS": "ARS / ACCESSORIES",
        "ARS / ACCESORIOS /": "ARS / ACCESSORIES /",
        "Completa tu identidad digital con accesorios seleccionados creados para tu avatar de IMVU.": "Complete your digital identity with selected accessories created for your IMVU avatar.",
        "TODO": "ALL",
        "08 ACCESORIOS": "08 ACCESSORIES",
        "ACCESORIO / 001": "ACCESSORY / 001",
        "ACCESORIO / 002": "ACCESSORY / 002",
        "ACCESORIO / 003": "ACCESSORY / 003",
        "ACCESORIO / 004": "ACCESSORY / 004",
        "ACCESORIO / 005": "ACCESSORY / 005",
        "ACCESORIO / 006": "ACCESSORY / 006",
        "ACCESORIO / 007": "ACCESSORY / 007",
        "ACCESORIO / 008": "ACCESSORY / 008",
        "ARS CADENA": "ARS CHAIN",
        "ARS COLLAR": "ARS NECKLACE",
        "ARS ANILLO": "ARS RING",
        "ARS PLATA": "ARS SILVER",
        "ARS NEGRO": "ARS BLACK",
        "ARS ESTRELLA": "ARS STAR",
        "ARS / SERVICIOS / PERSONALIZADO": "ARS / SERVICES / CUSTOM",
        "CREA": "CREATE",
        "TU ESTILO": "YOUR STYLE",
        "Diseños personalizados creados para representar tu identidad dentro de IMVU.": "Custom designs created to express your identity in IMVU.",
        "EXPLORAR PERSONALIZADOS": "EXPLORE CUSTOM DESIGNS",
        "ARS / CUSTOM DESIGN": "ARS / CUSTOM DESIGN",
        "NUESTROS DISEÑOS": "OUR DESIGNS",
        "¿QUÉ PODEMOS CREAR?": "WHAT CAN WE CREATE?",
        "TU IDEA.": "YOUR IDEA.",
        "NUESTRO DISEÑO.": "OUR DESIGN.",
        "En ARS creamos prendas y diseños personalizados para que puedas llevar tu propia idea a tu avatar de IMVU.": "At ARS, we create custom designs so you can bring your own idea to your IMVU avatar.",
        "Desde pequeños detalles hasta diseños completamente personalizados, cada pieza busca representar tu estilo.": "From small details to fully custom designs, every piece is made to express your style.",
        "NUESTRO PROCESO": "OUR PROCESS",
        "INSPIRACIÓN": "INSPIRATION",
        "DISEÑO": "DESIGN",
        "CREACIÓN": "CREATION",
        "ENTREGA": "DELIVERY",
        "SOLICITA TU DISEÑO": "REQUEST YOUR DESIGN",
        "Instagram": "Instagram",
        "TikTok": "TikTok",
        "© 2026 ARS | IMVU": "© 2026 ARS | IMVU"
    };

    const reverseTranslations = Object.fromEntries(
        Object.entries(translations).map(([spanish, english]) => [english, spanish])
    );

    const normalize = (value) => value.replace(/\s+/g, " ").trim();

    const updateTextNodes = (dictionary) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let currentNode;

        while ((currentNode = walker.nextNode())) {
            if (!currentNode.parentElement.closest("script, style, .language-toggle")) {
                textNodes.push(currentNode);
            }
        }

        textNodes.forEach((textNode) => {
            const normalizedText = normalize(textNode.nodeValue);
            const translatedText = dictionary[normalizedText];

            if (translatedText) {
                const leadingSpace = textNode.nodeValue.match(/^\s*/)[0];
                const trailingSpace = textNode.nodeValue.match(/\s*$/)[0];
                textNode.nodeValue = `${leadingSpace}${translatedText}${trailingSpace}`;
            }
        });
    };

    const savedLanguage = localStorage.getItem("ars-language") || "es";
    let currentLanguage = savedLanguage;

    const setLanguage = (language) => {
        updateTextNodes(language === "en" ? translations : reverseTranslations);
        document.documentElement.lang = language;
        localStorage.setItem("ars-language", language);
        currentLanguage = language;

        document.querySelectorAll(".language-toggle").forEach((button) => {
            button.setAttribute("aria-label", language === "en" ? "Switch to Spanish" : "Cambiar a inglés");
            button.title = language === "en" ? "Español / English" : "English / Español";
        });
    };

    document.querySelectorAll(".language-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            setLanguage(currentLanguage === "es" ? "en" : "es");
        });
    });

    document.querySelectorAll(".mobile-menu").forEach((button) => {
        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const header = button.closest(".header");
            const isOpen = header.classList.toggle("menu-open");
            button.setAttribute("aria-expanded", String(isOpen));
        });

        button.closest(".header")?.querySelectorAll(".nav-left a").forEach((link) => {
            link.addEventListener("click", () => {
                const header = button.closest(".header");
                header.classList.remove("menu-open");
                button.setAttribute("aria-expanded", "false");
            });
        });
    });

    if (currentLanguage === "en") {
        setLanguage("en");
    }
})();
