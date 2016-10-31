create table preguntas(
    categoriaid int not null, 
    areaid int not null,
    preguntaid int not null,
    texto varchar(4096) not null,
    correcta varchar(1) not null,
constraint pk_preguntas primary key (categoriaid, areaid, preguntaid),
constraint fk_preguntas_categorias foreign key (categoriaid) references categorias(id),
constraint fk_preguntas_areas foreign key (areaid) references areas(id))
