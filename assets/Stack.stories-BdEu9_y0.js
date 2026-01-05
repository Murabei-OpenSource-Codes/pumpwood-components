import{j as e}from"./jsx-runtime-fXg_pr7h.js";import{c as m}from"./utils-CDN07tui.js";import"./iframe-CNw1ZKb7.js";import"./preload-helper-PPVm8Dsz.js";function i({children:n,direction:s,gap:t,className:a,...o}){const c=t?`gap-${t}`:"gap-0",d=`${s==="row"?"flex flex-row":"flex flex-col"} ${c}`;return e.jsx("div",{className:m(d,a),...o,children:n})}i.__docgenInfo={description:"",methods:[],displayName:"Stack",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},direction:{required:!1,tsType:{name:"union",raw:'"row" | "col"',elements:[{name:"literal",value:'"row"'},{name:"literal",value:'"col"'}]},description:""},gap:{required:!1,tsType:{name:"number"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const g={title:"Pumpwood/Elements/Stack",component:i},r={args:{children:e.jsxs(e.Fragment,{children:[e.jsx("div",{children:"Item 1"}),e.jsx("div",{children:"Item 2"}),e.jsx("div",{children:"Item 3"})]}),direction:"col",gap:2,className:"bg-red-500 w-fit p-10 text-white rounded-xl"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </>,
    direction: 'col',
    gap: 2,
    className: 'bg-red-500 w-fit p-10 text-white rounded-xl'
  }
}`,...r.parameters?.docs?.source}}};const v=["Primary"];export{r as Primary,v as __namedExportsOrder,g as default};
