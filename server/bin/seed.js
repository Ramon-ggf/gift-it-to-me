const mongoose = require('mongoose')

const Petition = require('./../models/Petition.model')

const dbtitle = 'finalproject20'

mongoose.connect('mongodb+srv://gifit:gifit123@cluster0.7hs5u.mongodb.net/finalproject20')

const petitions = [
    {
        title: 'Muñeca Barbie para niña',
        description:'Me gustaría tener una muñeca Barbie para mi hija que llava piendiéndomela varios meses. Gracias.',
        age: 4,
        sex: 'femenino',
        image: 'https://juguettos.com/2355991-large_default/barbie-y-vestidos-exclusiva.jpg',
        owner:'5fd115bc316f54211863619a',
        giver: undefined,
        center: '5fd1148fb072282078e2f969',
        status: true,
        sent: false
    },
    {
        title: 'Auriculares para ecuchar la radio',
        description:'Quiero unos auriculares para escuchar el transistor por la noche sin molestar a mi pobre mujer.',
        age: 98,
        sex: 'masculino',
        image: 'https://static3.leonoticias.com/www/multimedia/201905/02/media/cortadas/anciano-k02C-U8098492239wVE-624x385@Leonoticias.jpeg',
        owner:'5fd115bc316f54211863619b',
        giver: undefined,
        center: '5fd1148fb072282078e2f96a',
        status: true,
        sent: false
    },
    {
        title: 'Caballete de pintura',
        description:'Me gustaría un caballete para poder pintar mis lienzos sin dejarme la espalda.',
        age: 82,
        sex: 'femenino',
        image: 'https://propinturas.es/wp-content/uploads/2018/08/caballete-pintor-w09.jpg',
        owner:'5fd115bc316f54211863619a',
        giver: undefined,
        center: '5fd1148fb072282078e2f96b',
        status: true,
        sent: false
    },
    {
        title: 'Balón de Messi',
        description:'Nos gustaría tener un balón de fúlbol para nuestro hijo, Joselito, que es súper fan de Leo Messi.',
        age: 7,
        sex: 'masculino',
        image: 'https://www.cdc.gov/ncbddd/spanish/childdevelopment/positiveparenting/images/preschool-400px.jpg',
        owner:'5fd115bc316f54211863619b',
        giver: undefined,
        center: '5fd1148fb072282078e2f96c',
        status: true,
        sent: false
    },
    {
        title: 'Carrito de muñecas',
        description:'Queremos un carrito de muñecas para nuestro hijo, Nestorcito, que lleva pidiéndolo varios años y nunca ha podido tener uno.',
        age: 5,
        sex: 'masculino',
        image: 'https://kidshome.es/62927-thickbox_default/carrito-de-munecas-topos-gris.jpg',
        owner:'5fd115bc316f54211863619b',
        giver: undefined,
        center: '5fd1148fb072282078e2f96d',
        status: true,
        sent: false
    }
]

Petition
    .create(petitions)
    .then(response => {
        console.log(`Created ${response.length} petitions`)
        mongoose.connection.close()
    })
    .catch((err) => console.log(`An error ocurred: ${err}`))