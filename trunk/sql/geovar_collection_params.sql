-- Table: public.geovar_collection_params

-- DROP TABLE IF EXISTS public.geovar_collection_params;

CREATE TABLE IF NOT EXISTS public.geovar_collection_params
(
    g_master character varying COLLATE pg_catalog."default",
    g_slug character varying COLLATE pg_catalog."default",
    g_label character varying COLLATE pg_catalog."default",
    g_description character varying COLLATE pg_catalog."default",
    data_type character varying COLLATE pg_catalog."default",
    form_type character varying COLLATE pg_catalog."default",
    g_required integer DEFAULT 0,
    g_placeholder character varying COLLATE pg_catalog."default",
    post_status character varying COLLATE pg_catalog."default" DEFAULT 'publish'::character varying,
    post_date timestamp without time zone DEFAULT now(),
    post_modified timestamp without time zone DEFAULT now(),
    item_token character varying COLLATE pg_catalog."default",
    g_options json,
    g_sub json,
    g_module json,
    pid integer NOT NULL DEFAULT nextval('geovar_collection_params_pid_seq'::regclass),
    CONSTRAINT geovar_collection_params_pkey PRIMARY KEY (pid),
    CONSTRAINT geovar_collection_params_unique3 UNIQUE (item_token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.geovar_collection_params
    OWNER to gis_database;

COMMENT ON TABLE public.geovar_collection_params
    IS 'live:220716';

-- Trigger: twd_update1_geovar_collection_params

-- DROP TRIGGER IF EXISTS twd_update1_geovar_collection_params ON public.geovar_collection_params;

CREATE TRIGGER twd_update1_geovar_collection_params
    AFTER INSERT
    ON public.geovar_collection_params
    FOR EACH ROW
    EXECUTE FUNCTION public.fwd_update1_geovar_collection_params();

-- Trigger: twd_update3_geovar_collection_params

-- DROP TRIGGER IF EXISTS twd_update3_geovar_collection_params ON public.geovar_collection_params;

CREATE TRIGGER twd_update3_geovar_collection_params
    BEFORE UPDATE 
    ON public.geovar_collection_params
    FOR EACH ROW
    EXECUTE FUNCTION public.fwd_update_post_modified();