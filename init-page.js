import fs from 'fs';
import path from 'path';
const resolve = (dir) => path.join(__dirname, dir);

import routes from './src/routes';

const folderPath = 'src/pages';
const templateName = 'home';

const types = {
   html: 'html',
   js: 'js',
   vue: 'vue',
   component: 'component'
}

const capitalize = (s) => {
   if (typeof s !== 'string') return ''
   return s.charAt(0).toUpperCase() + s.slice(1)
}

const getTemplatePath = (ext) => {
   if(ext === types.html) return resolve(`${folderPath}/${templateName}/${templateName}.html`);
   if(ext === types.js) return resolve(`${folderPath}/${templateName}/${templateName}.js`);
   if(ext === types.vue) return resolve(`${folderPath}/${templateName}/App.vue`);
   if(ext === types.component) return resolve(`src/template/component.vue`);
}

const getContent = (name, ext) => {
   let template = fs.readFileSync(getTemplatePath(ext), 'utf8');
   if(ext === types.html || ext === types.vue) return template.replace(/home/g , name.toLowerCase()).replace(/Home/g, capitalize(name));
  
   if(ext === types.component) return template.replace(/NAME/g, capitalize(name));
   return template;
}

const createSaveFolder = (name, ext) => {
   let folder = resolve(`${folderPath}/${name}`);
   if(ext === types.component) folder += '/components';
   if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
   }
}

const getSavePath = (name, ext) => {
   if(ext === types.html) return resolve(`${folderPath}/${name}/${name}.html`);
   if(ext === types.js) return resolve(`${folderPath}/${name}/${name}.js`);
   if(ext === types.vue) return resolve(`${folderPath}/${name}/App.vue`);
   if(ext === types.component) return resolve(`${folderPath}/${name}/components/${capitalize(name)}.vue`);
} 



const allPages = [{ name: 'damn' }];//routes.getAllPages();

allPages.forEach(page => {
   Object.keys(types).forEach(type => {
      let content = getContent(page.name, type);

      createSaveFolder(page.name, type);
      let savePath = getSavePath(page.name, type);

      if(type === types.component){
         if(!fs.existsSync(savePath)) fs.writeFileSync(savePath, content, 'utf8');
      }else {
         fs.writeFileSync(savePath, content, 'utf8');
      }
      
   });
})




// fs.readFile(getTemplatePath(types.js), { encoding: 'utf-8' }, (err, data) => {
//    if(err) {
//      throw new Error(err);
//    }else {
//       createJS('damn', data);  
//    }
// });



const createPage = (name) => {




   createSaveFolder(name, types.html);

   let savePath = getSavePath(name, types.html);
   let content = template.replace('home', name.toLowerCase()).replace('Home', capitalize(name));
   fs.writeFile(savePath, content, 'utf8', (err) => {
      if(err) {
         throw err;
      }
   });
}

const createJS = (name, template) => {
   createSaveFolder(name, types.js);

   let savePath = getSavePath(name, types.js);
   let content = template.replace('home', name.toLowerCase()).replace('Home', capitalize(name));
   fs.writeFile(savePath, content, 'utf8', (err) => {
      if(err) {
         throw err;
      }
   });
}

const createVue = (name, template) => {
   createSaveFolder(name, types.vue);

   let savePath = getSavePath(name, types.vue);
   let content = template.replace('home', name.toLowerCase()).replace('Home', capitalize(name));
   fs.writeFile(savePath, content, 'utf8', (err) => {
      if(err) {
         throw err;
      }
   });
}

