create table respuestas(
    categoriaid int not null, 
    areaid int not null,
    preguntaid int not null,
    respuestaid varchar(1) not null check (respuestaid in ('A','B','C','D')),
    texto varchar(4096) not null,
constraint pk_respuestas primary key (categoriaid, areaid, preguntaid, respuestaid),
constraint fk_respuestas_categorias foreign key (categoriaid) references categorias(id),
constraint fk_respuestas_areas foreign key (areaid) references areas(id),
constraint fk_respuestas_preguntas foreign key (categoriaid,areaid,preguntaid)
    references preguntas(categoria,areaid,preguntaid))