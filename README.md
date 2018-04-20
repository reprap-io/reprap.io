To start:
Ensure node and npm are installed, then:

```git clone https://github.com/reprap-io/reprap.io.git ```
```cd reprap.io```
```npm install```
```npm start```

Navigate to http://localhost:3000 in your browser


# reprap.io
An open source tool for effectively sharing and browsing 3D printable objects 

# Goals
  *GitHub based

  *Fast & effective searching and browsing of 3D-printable objects & projects

  *Clean, modern UI


# Roadmap

__Detecting a file to display__
All repositories tagged 'reprapio' will display on reprap.io


__Specification for 'reprap.io' file:__

  *YAML file containing information about what and how to display information about a 3D object on reprap.io
    
---


__Specification for 'reprap.io' 3D object GitHub repository:__

  *A repository containing an object to be displayed by reprap.io
  
  *Recommended files/folders structure:
  
    /doc
        
    /src
    
    readme.md
    
    reprap.io
   
  
   
---


__Implementation:__

  *Display data returned directly from GitHub API using three.js similar to http://stl.garden, using in browser STL render
  
  *Search GitHub directly similar to http://olegsmetanin.github.io/react_react-router_flummox_example/#/search/golang
  
  *Browse reprapio repositories, sorted by last modified / number of stars for "browsing"  
