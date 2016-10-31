select respuestaid, texto from respuestas
where categoriaid = ?
and areaid = ?
and preguntaid = ?
order by respuestaid