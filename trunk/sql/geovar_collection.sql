-- Table: public.geovar_collection

-- DROP TABLE IF EXISTS public.geovar_collection;

CREATE TABLE IF NOT EXISTS public.geovar_collection
(
    item_token character varying COLLATE pg_catalog."default",
    post_date timestamp without time zone DEFAULT now(),
    post_modified timestamp without time zone DEFAULT now(),
    post_status character varying COLLATE pg_catalog."default" DEFAULT 'publish'::character varying,
    g_slug character varying COLLATE pg_catalog."default",
    g_label character varying COLLATE pg_catalog."default",
    g_action character varying COLLATE pg_catalog."default",
    g_block_params boolean DEFAULT true,
    g_response_table boolean DEFAULT false,
    g_response_map boolean DEFAULT false,
    g_sub json,
    pid integer NOT NULL DEFAULT nextval('geovar_collection_pid_seq'::regclass),
    CONSTRAINT geovar_collection_pkey PRIMARY KEY (pid),
    CONSTRAINT geovar_collection_unique3 UNIQUE (item_token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.geovar_collection
    OWNER to gis_database;

COMMENT ON TABLE public.geovar_collection
    IS 'live:220716';

-- Trigger: twd_update1_geovar_collection

-- DROP TRIGGER IF EXISTS twd_update1_geovar_collection ON public.geovar_collection;

CREATE TRIGGER twd_update1_geovar_collection
    AFTER INSERT
    ON public.geovar_collection
    FOR EACH ROW
    EXECUTE FUNCTION public.fwd_update1_geovar_collection();

-- Trigger: twd_update3_geovar_collection

-- DROP TRIGGER IF EXISTS twd_update3_geovar_collection ON public.geovar_collection;

CREATE TRIGGER twd_update3_geovar_collection
    BEFORE UPDATE 
    ON public.geovar_collection
    FOR EACH ROW
    EXECUTE FUNCTION public.fwd_update_post_modified();