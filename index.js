import { initLip, Lipgloss } from "charsm"


//  documentation: https://www.npmjs.com/package/charsm

const content = `
# Today’s Menu

## Appetizers

| Name        | Price | Notes                           |
| ---         | ---   | ---                             |
| Tsukemono   | $2    | Just an appetizer               |
| Tomato Soup | $4    | Made with San Marzano tomatoes  |
| Okonomiyaki | $4    | Takes a few minutes to make     |
| Curry       | $3    | We can add squash if you’d like |

## Seasonal Dishes

| Name                 | Price | Notes              |
| ---                  | ---   | ---                |
| Steamed bitter melon | $2    | Not so bitter      |
| Takoyaki             | $3    | Fun to eat         |
| Winter squash        | $3    | Today it's pumpkin |

## Desserts

| Name         | Price | Notes                 |
| ---          | ---   | ---                   |
| Dorayaki     | $4    | Looks good on rabbits |
| Banana Split | $5    | A classic             |
| Cream Puff   | $3    | Pretty creamy!        |

All our dishes are made in-house by Karen, our chef. Most of our ingredients
are from our garden or the fish market down the street.

Some famous people that have eaten here lately:

* [x] René Redzepi
* [x] David Chang
* [ ] Jiro Ono (maybe some day)

Bon appétit!
`;



; (async function name() {
    const ini = await initLip()
    // console.log(ini)

    if (!ini)
        return

    const lip = new Lipgloss();

    //  console.log(lip.RenderMD(content, "tokyo-night"))




    // NB: charsm in active dev, some things jsut don't work
    const width = 96

    const columnWidth = 30


    const subtle = { Light: "#D9DCCF", Dark: "#383838" }
    const highlight = { Light: "#874BFD", Dark: "#7D56F4" }
    const special = { Light: "#43BF6D", Dark: "#73F59F" }


    lip.createStyle({
        id: "divider",
        canvasColor: { color: { adaptiveColor: subtle } },
        padding: [0],
        margin: [0],
        // border: {type: "rounded", sides: [truem]}
        // height: .1,

    });

    lip.createStyle({
        id: "url",
        canvasColor: { color: { adaptiveColor: special } },
        margin: [0]
    })

    let titleStyle = {
        id: "titleStyle",
        canvasColor: { color: "#FFF7DB", background: "" },
        margin: [0, 5, 0, 1],
        padding: [0, 1],
        // border: {type: "rounded", sides: [true]}
        // italic: true  m,issing
    }


    lip.createStyle({
        id: "docStyle",
        margin: [1, 0, 0, 0]
    })


    lip.createStyle({
        id: "infoStyle",
        margin: [0],
        border: { sides: [true, false, false, false], type: "rounded" },
        // height: 0.1,
    })

    lip.createStyle({
        id: "dialogBoxStyle",
        canvasColor: { color: "#874BFD" },
        margin: [0],
        padding: [1, 0],
        border: { type: "rounded", sides: [true] }
    })

    lip.createStyle({
        id: "buttonStyle",
        canvasColor: { color: "#874BFD", background: "#888B7E" },
        margin: [1, 0, 0, 0],
        padding: [0, 1],

    })

    lip.createStyle({
        id: "activeButtonStyle",
        canvasColor: { color: "#FFF7DB", background: "#F25D94" },
        margin: [1, 2, 0, 10],
        padding: [0, 1],
        // underline: true missing
    
    })

    lip.createStyle({
        id: "historyStyle",
        canvasColor: { color: "#FAFAFA", background: { adaptiveColor: highlight } },
        margin: [1, 3, 0, 0],
        padding: [1, 2],
        height: 19,
        width: columnWidth
        // underline: true missing
    
      })


        let alltitles = ""
  let stringBuilder = ""


  const colors = ["#dd56a8", "#c850bb", "#af49ce", "#9242e3"];

  const offset = 2
  // Loop through the color array and apply each one to the title
  for (let i = 0; i < colors.length; i++) {
    // Set the margin and background color dynamically
    titleStyle.margin[3] = (i + offset);  // Modify margin based on the index
    titleStyle.canvasColor["background"] = colors[i];  // Use the current color in the loop
    titleStyle.id = `titleStyle${i + 1}`;  // Set a unique ID for each title style

    // Create and apply the style
    lip.createStyle(titleStyle);
    const title = lip.apply({ value: "Charsm", id: titleStyle.id });
    if (i < colors.length - 1) {

      // Append the result to alltitles string
      alltitles += title + "\n\n"
    } else {
      // Append the result to alltitles string
      alltitles += title
    }
    ;
  }


  
  let info = lip.apply({ value: `From Charsm  ${lip.apply({ value: "•", id: "divider" })}  ${lip.apply({ value: "https://github.com/SfundoMhlungu/charsm/", id: "url" })}`, id: "infoStyle" })

  const desc = lip.join({ direction: "vertical", elements: [lip.apply({ value: "Style Definitions for Nice Terminal Layouts", id: "descStyle" }), info], position: "left" })

  const row = lip.join({ direction: "horizontal", elements: [alltitles, desc], position: "top" })


  stringBuilder += row + "\n\n" // append first row


  const okButton = lip.apply({ value: "Yes", id: "activeButtonStyle" })
  const cancelButton = lip.apply({ value: "Maybe", id: "buttonStyle" })

  lip.createStyle({
    id: "question",
    width: 50,
    height: 1,
    margin: [0],
    alignH: "center",
    alignV: "center",
    // border: {type: "rounded", sides: [true]}
  })

  // apply the above style immed 

  const question = lip.apply({ value: "Are you sure you want to eat marmalade?" })

  const buttons = lip.join({ direction: "horizontal", elements: [okButton, cancelButton], position: "center" })
  const ui = lip.join({ direction: "vertical", elements: [question, buttons], position: "center" })

  lip.createStyle({
    canvasColor: {color: {adaptiveColor: subtle}},
    id: "dialogue",
     alignH: "center",
     alignV: "center",
     width: width, 
     margin: [0],
     padding: [1, 2, 2, 5],
     height: 1,
     border: {type: "rounded", sides: [true], foreground: "#874BFD"},
  })

  let u =lip.join({direction: "horizontal", position: "center", elements: [lip.apply({value: ui})]})

// hacky way to center things since aligns don't work for some reason, margins and padding work perfectly 
  lip.createStyle({
    id: "container",
    // canvasColor: { color: "#7D56F4" },
    // border: { type: "rounded", background: "#0056b3", sides: [true] },
    padding: [1, 8, 1, 8],
    margin: [0, 8, 0, 8],
    // bold: true,
    // align: 'center',
    width: 10,
    height: 1,

  });
    // apply container to u
    stringBuilder += lip.apply({value: u}) + "\n\n"


    lip.createStyle({
        id: "listStyle",
        margin: [0, 0, 0, 0 ],
        padding: [1, 8, 0, 0],
        border: { type: "rounded", foreground: {adaptiveColor: subtle}, sides: [false, true, false, false] },
    
      })


      const l =   lip.List({data: ["Grapefruit", "Yuzu", "Citron", "Pomelo", "Kumquat"], selected: ["Grapefruit", "Yuzu"], listStyle: "custom", customEnum: "✓", styles: {numeratorColor: special.Dark, itemColor: subtle.Dark, marginRight: 1}})
      const l2 =   lip.List({data: ["Actual Lip Gloss Vendors", "Glossier", "Claire‘s Boutique", "Nyx", "Mac"], selected: ["Mac", "Glossier"], listStyle: "custom", customEnum: "✓", styles: {numeratorColor: special.Dark, itemColor: subtle.Dark, marginRight: 1}})
      stringBuilder += lip.join({direction: "horizontal", elements: [lip.apply({value:l}), lip.apply({value:l2})], position: "left"}) + "\n\n"
     


      console.log(stringBuilder)



})()