export const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://heightcomparisoncalculator.com/#organization",
      "name": "Height Comparison Calculator",
      "url": "https://heightcomparisoncalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://heightcomparisoncalculator.com/it/logo.png",
        "width": 512,
        "height": 512
      },
      "email": "contact@heightcomparisoncalculator.com"
    },
    {
      "@type": "WebSite",
      "@id": "https://heightcomparisoncalculator.com/#website",
      "url": "https://heightcomparisoncalculator.com",
      "name": "Height Comparison Calculator",
      "publisher": {
        "@id": "https://heightcomparisoncalculator.com/#organization"
      },
      "inLanguage": "it"
    },
    {
      "@type": "WebPage",
      "@id": "https://heightcomparisoncalculator.com/#webpage",
      "url": "https://heightcomparisoncalculator.com/",
      "name": "Height Comparison Chart - Person Height, Character Height & More",
      "description": "Use Height Comparison Calculator to compare heights online. Create a height comparison chart for people or characters with this easy height comparison website",
      "inLanguage": "it",
      "isPartOf": {
        "@id": "https://heightcomparisoncalculator.com/#website"
      },
      "about": {
        "@id": "https://heightcomparisoncalculator.com/#tool"
      },
      "mainEntity": {
        "@id": "https://heightcomparisoncalculator.com/#tool"
      },
      "primaryImageOfPage": {
        "@id": "https://heightcomparisoncalculator.com/#example-chart"
      },
      "breadcrumb": {
        "@id": "https://heightcomparisoncalculator.com/#breadcrumb"
      },
      "hasPart": {
        "@id": "https://heightcomparisoncalculator.com/#faq"
      },
      "dateModified": "2026-11-14"
    },
    {
      "@type": "ImageObject",
      "@id": "https://heightcomparisoncalculator.com/#example-chart",
      "url": "https://heightcomparisoncalculator.com/it/height-comparison-chart-example.png",
      "caption": "Height comparison chart of a 5'7\" and a 6'1\" person side by side",
      "width": 1200,
      "height": 630
    },
    {
      "@type": [
        "SoftwareApplication",
        "WebApplication"
      ],
      "@id": "https://heightcomparisoncalculator.com/#tool",
      "name": "Height Comparison Calculator",
      "url": "https://heightcomparisoncalculator.com/",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "inLanguage": "it",
      "isAccessibleForFree": true,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@id": "https://heightcomparisoncalculator.com/#organization"
      },
      "description": "Free online tool that draws people, celebrities, fictional characters and objects side by side at true proportional scale, in cm or feet and inches.",
      "featureList": [
        "Compare unlimited subjects on one chart",
        "1,294 celebrity, 1,138 fictional character and 264 object presets",
        "Centimeters, meters, feet and inches",
        "Scale from a few centimeters to 10,000 meters",
        "PNG download",
        "Share links"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://heightcomparisoncalculator.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I compare two people's heights side by side?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Click Add Person, enter a name and height in cm or ft/in, and pick a color. Add a second person the same way. The height chart updates instantly at exact proportional scale. You can also search the celebrity database or fictional character panel for pre-loaded heights."
          }
        },
        {
          "@type": "Question",
          "name": "How does the chart calculate proportions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The chart uses a visual ratio engine. If Person A is 170 cm and Person B is 185 cm, the second bar renders at exactly 1.09x the first. That ratio is calculated mathematically from the values entered. Bars use the exact values you enter, and only the text labels round, to the nearest cm or inch."
          }
        },
        {
          "@type": "Question",
          "name": "How many people can I add to one comparison?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no limit. Add as many people, celebrities, fictional characters, and real-world objects as you want. All subjects share one proportional chart and the chart scales automatically."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between this tool and the Height Difference Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This height comparison tool generates a proportional visual chart for all subjects at true scale. The Height Difference Calculator returns the exact gap between two heights in cm, inches, and percentage. Use the comparison tool to see the visual, and the difference calculator for the precise number."
          }
        },
        {
          "@type": "Question",
          "name": "Who is the tallest person in the world?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The tallest living person is Sultan Kösen of Turkey at 251 cm (8 ft 2.8 in), as measured by Guinness World Records in 2011. The tallest person ever recorded was Robert Wadlow of the USA at 272 cm (8 ft 11.1 in). You can add either to this height chart by entering the height in the Add Person panel."
          }
        },
        {
          "@type": "Question",
          "name": "What is the average height by age?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key US benchmarks from CDC data: 4-year-old boy: approx. 103 cm (3 ft 4 in). 10-year-old boy: approx. 138 cm (4 ft 6 in). 10-year-old girl: approx. 138 cm (4 ft 6 in). Adult men (US, 20 and older, 2021 to 2023): 175.0 cm (5 ft 8.9 in). Adult women (US, 20 and older, 2021 to 2023): 161.3 cm (5 ft 3.5 in). Median at age 20 on CDC growth charts: 176.9 cm for men and 163.3 cm for women. For full average height by age tables across all ages and genders, see our Height Weight Percentile Calculator."
          }
        },
        {
          "@type": "Question",
          "name": "Is 2 inches a big height difference?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Two inches is 5.1 cm, about 3% of an average US man's height of 5'9\" (68.9 in). Side by side, the taller person's eye line sits 2 inches higher, about the short side of a credit card. Enter both heights in the chart to see the gap at true scale."
          }
        },
        {
          "@type": "Question",
          "name": "How much taller is 5'10\" than 5'7\"?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "5'10\" is 3 inches (7.6 cm) taller than 5'7\", or 4.5% taller. In centimeters, that is 177.8 cm against 170.2 cm."
          }
        },
        {
          "@type": "Question",
          "name": "How do I convert cm to feet and inches?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Divide centimeters by 2.54 to get inches, then divide by 12 for feet. 169 cm is 66.5 inches, or 5 ft 6.5 in. To go the other way, multiply total inches by 2.54: 5'1\" is 61 inches, or 154.9 cm. The cm to ft button on the chart converts every subject at once."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://heightcomparisoncalculator.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://heightcomparisoncalculator.com/"
        }
      ]
    }
  ]
};
